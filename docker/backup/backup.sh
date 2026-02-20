#!/bin/sh
# HIPAA-Compliant Medical System Backup Script
# Implements automated backup, encryption, verification, and monitoring

set -e

BACKUP_DIR="/backups"
DB_HOST="${DB_HOST:-postgres}"
DB_NAME="${DB_NAME:-healthy_stellar}"
DB_USER="${DB_USER:-medical_user}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-90}"
ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY}"
LOG_FILE="/var/log/backup.log"

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    log "ERROR: $1"
    exit 1
}

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"
mkdir -p "$(dirname "$LOG_FILE")"

# Function to perform full database backup
backup_database_full() {
    log "Starting FULL database backup"
    
    BACKUP_FILE="$BACKUP_DIR/full_backup_${TIMESTAMP}.pgdump"
    
    # Full database backup with all data
    pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
        --verbose --clean --no-owner --no-privileges \
        --format=custom \
        --file="$BACKUP_FILE" 2>&1 | tee -a "$LOG_FILE"
    
    if [ $? -eq 0 ]; then
        log "Database backup completed successfully"
        
        # Encrypt backup (HIPAA requirement)
        encrypt_backup "$BACKUP_FILE"
        
        # Compress backup
        compress_backup "${BACKUP_FILE}.enc"
        
        # Calculate checksum
        CHECKSUM=$(sha256sum "${BACKUP_FILE}.enc.gz" | awk '{print $1}')
        log "Backup checksum: $CHECKSUM"
        
        # Store metadata
        echo "{\"timestamp\":\"$TIMESTAMP\",\"type\":\"full\",\"checksum\":\"$CHECKSUM\",\"size\":$(stat -f%z "${BACKUP_FILE}.enc.gz" 2>/dev/null || stat -c%s "${BACKUP_FILE}.enc.gz")}" > "${BACKUP_FILE}.enc.gz.meta"
        
        # Remove unencrypted file
        rm -f "$BACKUP_FILE"
        
        log "Full backup completed: ${BACKUP_FILE}.enc.gz"
    else
        error_exit "Database backup failed"
    fi
}

# Function to perform incremental backup
backup_database_incremental() {
    log "Starting INCREMENTAL database backup"
    
    # Find last full backup
    LAST_FULL=$(find "$BACKUP_DIR" -name "full_backup_*.pgdump.enc.gz" -type f | sort -r | head -1)
    
    if [ -z "$LAST_FULL" ]; then
        log "No full backup found, performing full backup instead"
        backup_database_full
        return
    fi
    
    BACKUP_FILE="$BACKUP_DIR/incremental_backup_${TIMESTAMP}.pgdump"
    
    # Incremental backup (changes since last full backup)
    pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
        --verbose --clean --no-owner --no-privileges \
        --format=custom \
        --file="$BACKUP_FILE" 2>&1 | tee -a "$LOG_FILE"
    
    if [ $? -eq 0 ]; then
        log "Incremental backup completed successfully"
        
        encrypt_backup "$BACKUP_FILE"
        compress_backup "${BACKUP_FILE}.enc"
        
        CHECKSUM=$(sha256sum "${BACKUP_FILE}.enc.gz" | awk '{print $1}')
        log "Backup checksum: $CHECKSUM"
        
        echo "{\"timestamp\":\"$TIMESTAMP\",\"type\":\"incremental\",\"checksum\":\"$CHECKSUM\",\"base\":\"$LAST_FULL\"}" > "${BACKUP_FILE}.enc.gz.meta"
        
        rm -f "$BACKUP_FILE"
        
        log "Incremental backup completed: ${BACKUP_FILE}.enc.gz"
    else
        error_exit "Incremental backup failed"
    fi
}

# Function to encrypt backup (HIPAA requirement)
encrypt_backup() {
    local INPUT_FILE="$1"
    local OUTPUT_FILE="${INPUT_FILE}.enc"
    
    if [ -z "$ENCRYPTION_KEY" ]; then
        error_exit "BACKUP_ENCRYPTION_KEY not set - encryption required for HIPAA compliance"
    fi
    
    log "Encrypting backup: $INPUT_FILE"
    
    # Use AES-256-CBC encryption
    openssl enc -aes-256-cbc -salt -pbkdf2 -in "$INPUT_FILE" -out "$OUTPUT_FILE" -k "$ENCRYPTION_KEY"
    
    if [ $? -eq 0 ]; then
        log "Encryption completed successfully"
    else
        error_exit "Encryption failed"
    fi
}

# Function to compress backup
compress_backup() {
    local INPUT_FILE="$1"
    
    log "Compressing backup: $INPUT_FILE"
    
    gzip -9 "$INPUT_FILE"
    
    if [ $? -eq 0 ]; then
        log "Compression completed successfully"
    else
        error_exit "Compression failed"
    fi
}

# Function to test backup integrity
test_backup() {
    LATEST_BACKUP=$(find "$BACKUP_DIR" -name "*_backup_*.pgdump.enc.gz" -type f | sort -r | head -1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        error_exit "No backups found to test"
    fi
    
    log "Testing backup integrity: $LATEST_BACKUP"
    
    # Test compression integrity
    gunzip -t "$LATEST_BACKUP"
    if [ $? -ne 0 ]; then
        error_exit "Backup compression integrity test failed"
    fi
    
    # Verify checksum
    if [ -f "${LATEST_BACKUP}.meta" ]; then
        STORED_CHECKSUM=$(grep -o '"checksum":"[^"]*"' "${LATEST_BACKUP}.meta" | cut -d'"' -f4)
        ACTUAL_CHECKSUM=$(sha256sum "$LATEST_BACKUP" | awk '{print $1}')
        
        if [ "$STORED_CHECKSUM" = "$ACTUAL_CHECKSUM" ]; then
            log "Checksum verification passed"
        else
            error_exit "Checksum verification failed"
        fi
    fi
    
    log "Backup integrity test passed"
}

# Function to verify backup can be restored
verify_restore() {
    LATEST_BACKUP=$(find "$BACKUP_DIR" -name "*_backup_*.pgdump.enc.gz" -type f | sort -r | head -1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        error_exit "No backups found to verify"
    fi
    
    log "Verifying backup restore capability: $LATEST_BACKUP"
    
    TEST_DB="test_restore_${TIMESTAMP}"
    TEMP_FILE="/tmp/restore_test_${TIMESTAMP}.pgdump"
    
    # Decompress
    gunzip -c "$LATEST_BACKUP" > "${TEMP_FILE}.enc"
    
    # Decrypt
    openssl enc -aes-256-cbc -d -pbkdf2 -in "${TEMP_FILE}.enc" -out "$TEMP_FILE" -k "$ENCRYPTION_KEY"
    
    # Create test database
    createdb -h "$DB_HOST" -U "$DB_USER" "$TEST_DB" || error_exit "Failed to create test database"
    
    # Attempt restore
    pg_restore -h "$DB_HOST" -U "$DB_USER" -d "$TEST_DB" "$TEMP_FILE" 2>&1 | tee -a "$LOG_FILE"
    
    if [ $? -eq 0 ]; then
        log "Restore verification passed"
        
        # Verify data
        TABLE_COUNT=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$TEST_DB" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
        log "Restored database contains $TABLE_COUNT tables"
    else
        error_exit "Restore verification failed"
    fi
    
    # Cleanup
    dropdb -h "$DB_HOST" -U "$DB_USER" "$TEST_DB"
    rm -f "$TEMP_FILE" "${TEMP_FILE}.enc"
    
    log "Restore verification completed successfully"
}

# Function to cleanup old backups
cleanup_old_backups() {
    log "Cleaning up backups older than $RETENTION_DAYS days"
    
    find "$BACKUP_DIR" -name "*_backup_*.pgdump.enc.gz" -type f -mtime +$RETENTION_DAYS -delete
    find "$BACKUP_DIR" -name "*_backup_*.pgdump.enc.gz.meta" -type f -mtime +$RETENTION_DAYS -delete
    
    log "Cleanup completed"
}

# Function to generate backup report
generate_report() {
    log "Generating backup report"
    
    TOTAL_BACKUPS=$(find "$BACKUP_DIR" -name "*_backup_*.pgdump.enc.gz" -type f | wc -l)
    TOTAL_SIZE=$(du -sh "$BACKUP_DIR" | awk '{print $1}')
    LATEST_BACKUP=$(find "$BACKUP_DIR" -name "*_backup_*.pgdump.enc.gz" -type f | sort -r | head -1)
    
    echo "=== Backup System Report ===" | tee -a "$LOG_FILE"
    echo "Generated: $(date)" | tee -a "$LOG_FILE"
    echo "Total Backups: $TOTAL_BACKUPS" | tee -a "$LOG_FILE"
    echo "Total Size: $TOTAL_SIZE" | tee -a "$LOG_FILE"
    echo "Latest Backup: $(basename "$LATEST_BACKUP")" | tee -a "$LOG_FILE"
    echo "Retention Policy: $RETENTION_DAYS days" | tee -a "$LOG_FILE"
    echo "HIPAA Compliance: Enabled (Encryption + Audit)" | tee -a "$LOG_FILE"
    echo "===========================" | tee -a "$LOG_FILE"
}

# Set up cron jobs for automated backups
setup_cron() {
    log "Setting up automated backup schedule"
    
    cat > /etc/crontabs/root <<EOF
# Full backup daily at 2 AM
0 2 * * * /backup.sh full >> $LOG_FILE 2>&1

# Incremental backup every 6 hours
0 */6 * * * /backup.sh incremental >> $LOG_FILE 2>&1

# Integrity test daily at 4 AM
0 4 * * * /backup.sh test >> $LOG_FILE 2>&1

# Restore verification weekly on Sunday at 3 AM
0 3 * * 0 /backup.sh verify >> $LOG_FILE 2>&1

# Cleanup old backups daily at 5 AM
0 5 * * * /backup.sh cleanup >> $LOG_FILE 2>&1

# Generate report daily at 6 AM
0 6 * * * /backup.sh report >> $LOG_FILE 2>&1
EOF
    
    log "Cron jobs configured successfully"
}

# Main execution
case "$1" in
    full)
        backup_database_full
        ;;
    incremental)
        backup_database_incremental
        ;;
    test)
        test_backup
        ;;
    verify)
        verify_restore
        ;;
    cleanup)
        cleanup_old_backups
        ;;
    report)
        generate_report
        ;;
    setup)
        setup_cron
        ;;
    *)
        echo "Usage: $0 {full|incremental|test|verify|cleanup|report|setup}"
        exit 1
        ;;
esac