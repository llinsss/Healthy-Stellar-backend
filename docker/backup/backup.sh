#!/bin/sh
# Medical System Backup Script

BACKUP_DIR="/backups"
DB_HOST="postgres"
DB_NAME="healthy_stellar"
DB_USER="medical_user"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Function to perform database backup
backup_database() {
    echo "Starting database backup at $(date)"
    
    # Full database backup
    pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME \
        --verbose --clean --no-owner --no-privileges \
        --format=custom \
        > "$BACKUP_DIR/medical_db_$TIMESTAMP.backup"
    
    if [ $? -eq 0 ]; then
        echo "Database backup completed successfully"
        
        # Compress backup
        gzip "$BACKUP_DIR/medical_db_$TIMESTAMP.backup"
        
        # Remove backups older than 30 days
        find $BACKUP_DIR -name "medical_db_*.backup.gz" -mtime +30 -delete
        
        echo "Backup cleanup completed"
    else
        echo "Database backup failed"
        exit 1
    fi
}

# Function to test backup integrity
test_backup() {
    LATEST_BACKUP=$(ls -t $BACKUP_DIR/medical_db_*.backup.gz | head -1)
    if [ -n "$LATEST_BACKUP" ]; then
        echo "Testing backup integrity: $LATEST_BACKUP"
        gunzip -t "$LATEST_BACKUP"
        if [ $? -eq 0 ]; then
            echo "Backup integrity test passed"
        else
            echo "Backup integrity test failed"
            exit 1
        fi
    fi
}

# Set up cron job for automated backups
setup_cron() {
    echo "0 2 * * * /backup.sh backup" > /etc/crontabs/root
    echo "0 3 * * 0 /backup.sh test" >> /etc/crontabs/root
}

case "$1" in
    backup)
        backup_database
        ;;
    test)
        test_backup
        ;;
    setup)
        setup_cron
        ;;
    *)
        echo "Usage: $0 {backup|test|setup}"
        exit 1
        ;;
esac