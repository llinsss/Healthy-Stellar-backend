# Healthcare Backup Procedures
## HIPAA-Compliant Backup Operations Manual

---

## Table of Contents
1. [Overview](#overview)
2. [Automated Backup Operations](#automated-backup-operations)
3. [Manual Backup Procedures](#manual-backup-procedures)
4. [Backup Verification](#backup-verification)
5. [Recovery Testing](#recovery-testing)
6. [Monitoring and Alerts](#monitoring-and-alerts)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### Backup Architecture
- **Primary Storage**: Local encrypted volumes
- **Backup Location**: `/backups` directory
- **Encryption**: AES-256-CBC with secure key management
- **Compression**: gzip level 9
- **Retention**: 90 days for full backups, 30 days for incremental

### HIPAA Compliance Features
✅ Encryption at rest (§ 164.312(a)(2)(iv))
✅ Access controls and authentication
✅ Audit logging of all operations
✅ Integrity verification (checksums)
✅ Regular testing and validation
✅ Documented procedures

---

## Automated Backup Operations

### Backup Schedule

```bash
# Full backup - Daily at 2:00 AM
0 2 * * * /backup.sh full

# Incremental backup - Every 6 hours
0 */6 * * * /backup.sh incremental

# Integrity test - Daily at 4:00 AM
0 4 * * * /backup.sh test

# Restore verification - Weekly on Sunday at 3:00 AM
0 3 * * 0 /backup.sh verify

# Cleanup old backups - Daily at 5:00 AM
0 5 * * * /backup.sh cleanup

# Generate report - Daily at 6:00 AM
0 6 * * * /backup.sh report
```

### Monitoring Automated Backups

```bash
# Check backup service status
docker-compose ps backup

# View backup logs
docker-compose logs backup --tail=100

# Check recent backup files
ls -lh /backups/ | tail -20

# View backup system health
curl http://localhost:3000/backup/monitoring/health
```

---

## Manual Backup Procedures

### Creating a Full Backup

#### Using Shell Script
```bash
# Execute full backup
docker-compose exec backup /backup.sh full

# Verify backup was created
ls -lh /backups/full_backup_*.pgdump.enc.gz | tail -1

# Check backup metadata
cat /backups/full_backup_*.pgdump.enc.gz.meta | tail -1
```

#### Using API
```bash
# Authenticate first
TOKEN=$(curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-password"}' \
  | jq -r '.access_token')

# Create full backup
curl -X POST http://localhost:3000/backup/full \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"

# Check backup history
curl http://localhost:3000/backup/history?limit=10 \
  -H "Authorization: Bearer $TOKEN"
```

### Creating an Incremental Backup

```bash
# Using shell script
docker-compose exec backup /backup.sh incremental

# Using API
curl -X POST http://localhost:3000/backup/incremental \
  -H "Authorization: Bearer $TOKEN"
```

### On-Demand Backup Before Maintenance

```bash
#!/bin/bash
# Pre-maintenance backup script

echo "Creating pre-maintenance backup..."

# Create backup with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
docker-compose exec backup /backup.sh full

# Wait for completion
sleep 60

# Verify backup
LATEST_BACKUP=$(ls -t /backups/full_backup_*.pgdump.enc.gz | head -1)

if [ -f "$LATEST_BACKUP" ]; then
    echo "Backup created successfully: $LATEST_BACKUP"
    
    # Test integrity
    docker-compose exec backup /backup.sh test
    
    echo "Ready for maintenance"
else
    echo "ERROR: Backup failed!"
    exit 1
fi
```

---

## Backup Verification

### Automated Verification

The system automatically verifies backups daily at 4:00 AM:

```bash
# Manual trigger of automated verification
docker-compose exec backup /backup.sh test

# Check verification status via API
curl http://localhost:3000/backup/verification/status \
  -H "Authorization: Bearer $TOKEN"
```

### Manual Verification Steps

#### 1. Checksum Verification
```bash
# Get stored checksum
STORED_CHECKSUM=$(grep -o '"checksum":"[^"]*"' /backups/full_backup_*.pgdump.enc.gz.meta | tail -1 | cut -d'"' -f4)

# Calculate actual checksum
ACTUAL_CHECKSUM=$(sha256sum /backups/full_backup_*.pgdump.enc.gz | tail -1 | awk '{print $1}')

# Compare
if [ "$STORED_CHECKSUM" = "$ACTUAL_CHECKSUM" ]; then
    echo "✓ Checksum verification passed"
else
    echo "✗ Checksum verification FAILED"
fi
```

#### 2. Compression Integrity
```bash
# Test gzip integrity
gunzip -t /backups/full_backup_*.pgdump.enc.gz

if [ $? -eq 0 ]; then
    echo "✓ Compression integrity verified"
else
    echo "✗ Compression integrity FAILED"
fi
```

#### 3. Encryption Verification
```bash
# Verify file is encrypted (should not contain readable text)
file /backups/full_backup_*.pgdump.enc.gz

# Should output: "gzip compressed data"
```

#### 4. API-Based Verification
```bash
# Get backup ID
BACKUP_ID=$(curl http://localhost:3000/backup/history?limit=1 \
  -H "Authorization: Bearer $TOKEN" \
  | jq -r '.[0].id')

# Verify backup
curl -X POST http://localhost:3000/backup/$BACKUP_ID/verify \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"verifiedBy":"admin-user-id"}'
```

---

## Recovery Testing

### Weekly Recovery Test (Automated)

```bash
# Trigger weekly recovery test
docker-compose exec backup /backup.sh verify

# Check test results
curl http://localhost:3000/backup/recovery/tests?limit=5 \
  -H "Authorization: Bearer $TOKEN"
```

### Manual Recovery Test Procedure

#### Step 1: Prepare Test Environment
```bash
# Create test database
docker-compose exec postgres createdb -U medical_user test_recovery_db
```

#### Step 2: Select Backup to Test
```bash
# List available backups
ls -lh /backups/*_backup_*.pgdump.enc.gz

# Choose backup (use latest or specific date)
BACKUP_FILE="/backups/full_backup_20240101_020000.pgdump.enc.gz"
```

#### Step 3: Decompress and Decrypt
```bash
# Decompress
gunzip -c $BACKUP_FILE > /tmp/backup.enc

# Decrypt
docker-compose exec backup sh -c \
  "openssl enc -aes-256-cbc -d -pbkdf2 \
   -in /tmp/backup.enc \
   -out /tmp/backup.pgdump \
   -k \$BACKUP_ENCRYPTION_KEY"
```

#### Step 4: Restore to Test Database
```bash
# Restore
docker-compose exec postgres pg_restore \
  -U medical_user \
  -d test_recovery_db \
  /tmp/backup.pgdump

# Verify restoration
docker-compose exec postgres psql \
  -U medical_user \
  -d test_recovery_db \
  -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"
```

#### Step 5: Validate Data
```bash
# Check critical tables
docker-compose exec postgres psql \
  -U medical_user \
  -d test_recovery_db \
  -c "SELECT 
        (SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM patients) as patients,
        (SELECT COUNT(*) FROM appointments) as appointments;"

# Verify data integrity
docker-compose exec postgres psql \
  -U medical_user \
  -d test_recovery_db \
  -c "SELECT table_name, 
             pg_size_pretty(pg_total_relation_size(quote_ident(table_name))) as size
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY pg_total_relation_size(quote_ident(table_name)) DESC 
      LIMIT 10;"
```

#### Step 6: Cleanup
```bash
# Drop test database
docker-compose exec postgres dropdb -U medical_user test_recovery_db

# Remove temporary files
rm -f /tmp/backup.enc /tmp/backup.pgdump
```

### API-Based Recovery Test
```bash
# Get latest backup ID
BACKUP_ID=$(curl http://localhost:3000/backup/history?limit=1 \
  -H "Authorization: Bearer $TOKEN" \
  | jq -r '.[0].id')

# Schedule recovery test
curl -X POST http://localhost:3000/backup/recovery/test \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"backupId\": \"$BACKUP_ID\",
    \"testedBy\": \"admin-user-id\"
  }"

# Monitor test progress
curl http://localhost:3000/backup/recovery/tests?limit=1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## Monitoring and Alerts

### Health Monitoring

```bash
# Get backup system health
curl http://localhost:3000/backup/monitoring/health \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'

# Expected output:
# {
#   "lastBackupTime": "2024-01-01T02:00:00Z",
#   "lastSuccessfulBackup": "2024-01-01T02:15:00Z",
#   "backupSuccessRate": 98.5,
#   "averageBackupDuration": 450,
#   "totalBackupSize": 5368709120,
#   "complianceStatus": "compliant",
#   "alerts": []
# }
```

### Alert Monitoring

```bash
# Get recent alerts
curl http://localhost:3000/backup/monitoring/alerts?limit=20 \
  -H "Authorization: Bearer $TOKEN"

# Filter critical alerts
curl http://localhost:3000/backup/monitoring/alerts \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.[] | select(.severity == "critical")'
```

### Statistics and Reporting

```bash
# Get 30-day statistics
curl http://localhost:3000/backup/monitoring/statistics?days=30 \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'

# Generate backup report
docker-compose exec backup /backup.sh report

# View backup logs
tail -n 100 /var/log/backup.log
```

### Setting Up Prometheus Monitoring

```yaml
# Add to prometheus.yml
scrape_configs:
  - job_name: 'backup-monitoring'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/backup/monitoring/metrics'
    scrape_interval: 60s
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Backup Failed with "Disk Full" Error

```bash
# Check disk space
df -h /backups

# Solution 1: Clean up old backups manually
find /backups -name "*_backup_*.pgdump.enc.gz" -mtime +90 -delete

# Solution 2: Increase backup volume size
docker-compose down
docker volume rm backup_data
# Edit docker-compose.yml to increase volume size
docker-compose up -d
```

#### Issue: Encryption Key Not Found

```bash
# Check if encryption key is set
docker-compose exec backup env | grep BACKUP_ENCRYPTION_KEY

# Solution: Set encryption key
echo "your-secure-encryption-key" > secrets/backup_encryption_key.txt

# Update docker-compose.yml to include secret
# Restart backup service
docker-compose restart backup
```

#### Issue: Backup Verification Failed

```bash
# Check backup file integrity
gunzip -t /backups/full_backup_*.pgdump.enc.gz

# If corrupted, restore from previous backup
ls -lh /backups/full_backup_*.pgdump.enc.gz

# Use earlier backup for recovery
```

#### Issue: Database Connection Failed During Backup

```bash
# Check database status
docker-compose ps postgres

# Check database connectivity
docker-compose exec postgres pg_isready -U medical_user

# Solution: Restart database if needed
docker-compose restart postgres

# Wait for database to be ready
sleep 30

# Retry backup
docker-compose exec backup /backup.sh full
```

#### Issue: Restore Test Failed

```bash
# Check detailed error logs
docker-compose logs backup --tail=200

# Common causes:
# 1. Wrong encryption key
# 2. Corrupted backup file
# 3. Insufficient disk space
# 4. Database version mismatch

# Verify backup file
file /backups/full_backup_*.pgdump.enc.gz
sha256sum /backups/full_backup_*.pgdump.enc.gz
```

### Emergency Procedures

#### If All Backups Are Corrupted

1. **Immediate Actions**:
   ```bash
   # Stop all write operations
   docker-compose stop app
   
   # Create emergency backup of current state
   docker-compose exec postgres pg_dump \
     -U medical_user \
     -d healthy_stellar \
     -F c \
     -f /backups/emergency_backup_$(date +%Y%m%d_%H%M%S).pgdump
   ```

2. **Contact Support**:
   - Database vendor support
   - Cloud provider support
   - Disaster recovery team

3. **Document Incident**:
   - Timeline of events
   - Actions taken
   - Data loss assessment
   - Recovery steps

#### If Backup Service Is Down

```bash
# Check service status
docker-compose ps backup

# View service logs
docker-compose logs backup

# Restart service
docker-compose restart backup

# If restart fails, recreate service
docker-compose up -d --force-recreate backup

# Verify service is running
docker-compose ps backup
```

---

## Best Practices

### Daily Operations
- ✅ Monitor backup completion notifications
- ✅ Review backup logs for errors
- ✅ Check disk space availability
- ✅ Verify latest backup integrity

### Weekly Operations
- ✅ Perform recovery test
- ✅ Review backup statistics
- ✅ Update documentation
- ✅ Test alert notifications

### Monthly Operations
- ✅ Full disaster recovery drill
- ✅ Audit backup compliance
- ✅ Review retention policies
- ✅ Update recovery procedures

### Quarterly Operations
- ✅ Comprehensive system test
- ✅ Security audit
- ✅ Staff training
- ✅ Vendor review

---

## Compliance Checklist

### HIPAA Requirements
- ☑ Data backup plan documented
- ☑ Disaster recovery procedures tested
- ☑ Encryption enabled for all backups
- ☑ Access controls implemented
- ☑ Audit logging enabled
- ☑ Regular testing performed
- ☑ Staff training completed
- ☑ Retention policies enforced

### Documentation Requirements
- ☑ Backup procedures documented
- ☑ Recovery procedures documented
- ☑ Test results recorded
- ☑ Incident reports maintained
- ☑ Audit trails preserved
- ☑ Training records kept

---

## Additional Resources

- **Disaster Recovery Plan**: See `DISASTER_RECOVERY_PLAN.md`
- **HIPAA Compliance**: See `HIPAA_COMPLIANCE.md`
- **API Documentation**: See `API_DOCUMENTATION.md`
- **Backup Script**: See `docker/backup/backup.sh`

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Next Review**: Quarterly
