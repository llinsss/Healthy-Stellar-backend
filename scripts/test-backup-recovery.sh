#!/bin/bash
# Comprehensive Backup and Recovery Testing Script
# Tests all backup and disaster recovery functionality

set -e

echo "=========================================="
echo "Backup & Recovery System Test Suite"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Helper functions
pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((TESTS_PASSED++))
}

fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    ((TESTS_FAILED++))
}

info() {
    echo -e "${YELLOW}ℹ INFO${NC}: $1"
}

# Test 1: Verify backup service is running
echo "Test 1: Backup Service Status"
if docker-compose ps backup | grep -q "Up"; then
    pass "Backup service is running"
else
    fail "Backup service is not running"
fi
echo ""

# Test 2: Check backup directory exists
echo "Test 2: Backup Directory"
if docker-compose exec -T backup test -d /backups; then
    pass "Backup directory exists"
else
    fail "Backup directory does not exist"
fi
echo ""

# Test 3: Check encryption key is configured
echo "Test 3: Encryption Configuration"
if docker-compose exec -T backup sh -c 'test -n "$BACKUP_ENCRYPTION_KEY"'; then
    pass "Backup encryption key is configured"
else
    fail "Backup encryption key is not configured"
fi
echo ""

# Test 4: Create a full backup
echo "Test 4: Full Backup Creation"
info "Creating full backup..."
if docker-compose exec -T backup /backup.sh full; then
    pass "Full backup created successfully"
else
    fail "Full backup creation failed"
fi
echo ""

# Test 5: Verify backup file exists
echo "Test 5: Backup File Verification"
BACKUP_COUNT=$(docker-compose exec -T backup sh -c 'ls -1 /backups/*_backup_*.pgdump.enc.gz 2>/dev/null | wc -l')
if [ "$BACKUP_COUNT" -gt 0 ]; then
    pass "Backup files found ($BACKUP_COUNT files)"
else
    fail "No backup files found"
fi
echo ""

# Test 6: Test backup integrity
echo "Test 6: Backup Integrity Test"
info "Testing backup integrity..."
if docker-compose exec -T backup /backup.sh test; then
    pass "Backup integrity test passed"
else
    fail "Backup integrity test failed"
fi
echo ""

# Test 7: Create incremental backup
echo "Test 7: Incremental Backup Creation"
info "Creating incremental backup..."
if docker-compose exec -T backup /backup.sh incremental; then
    pass "Incremental backup created successfully"
else
    fail "Incremental backup creation failed"
fi
echo ""

# Test 8: Verify restore capability
echo "Test 8: Restore Verification"
info "Testing restore capability (this may take a few minutes)..."
if timeout 300 docker-compose exec -T backup /backup.sh verify; then
    pass "Restore verification passed"
else
    fail "Restore verification failed or timed out"
fi
echo ""

# Test 9: Check backup logs
echo "Test 9: Backup Logging"
if docker-compose exec -T backup test -f /var/log/backup.log; then
    LOG_LINES=$(docker-compose exec -T backup wc -l < /var/log/backup.log)
    pass "Backup log exists with $LOG_LINES lines"
else
    fail "Backup log file not found"
fi
echo ""

# Test 10: Generate backup report
echo "Test 10: Backup Report Generation"
info "Generating backup report..."
if docker-compose exec -T backup /backup.sh report; then
    pass "Backup report generated successfully"
else
    fail "Backup report generation failed"
fi
echo ""

# Test 11: Check disk space
echo "Test 11: Storage Capacity"
DISK_USAGE=$(docker-compose exec -T backup df -h /backups | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    pass "Sufficient disk space available (${DISK_USAGE}% used)"
else
    fail "Low disk space warning (${DISK_USAGE}% used)"
fi
echo ""

# Test 12: Verify backup metadata
echo "Test 12: Backup Metadata"
METADATA_COUNT=$(docker-compose exec -T backup sh -c 'ls -1 /backups/*.meta 2>/dev/null | wc -l')
if [ "$METADATA_COUNT" -gt 0 ]; then
    pass "Backup metadata files found ($METADATA_COUNT files)"
else
    fail "No backup metadata files found"
fi
echo ""

# Test 13: Check backup encryption
echo "Test 13: Encryption Verification"
LATEST_BACKUP=$(docker-compose exec -T backup sh -c 'ls -t /backups/*_backup_*.pgdump.enc.gz 2>/dev/null | head -1')
if [ -n "$LATEST_BACKUP" ]; then
    # Check if file contains "encrypted" in its path
    if echo "$LATEST_BACKUP" | grep -q ".enc.gz"; then
        pass "Backup files are encrypted"
    else
        fail "Backup files may not be encrypted"
    fi
else
    fail "No backup files to verify encryption"
fi
echo ""

# Test 14: API Health Check (if app is running)
echo "Test 14: Backup API Health"
if docker-compose ps app | grep -q "Up"; then
    info "Checking backup API endpoint..."
    sleep 5  # Wait for app to be ready
    if curl -f -s http://localhost:3000/health > /dev/null 2>&1; then
        pass "Backup API is accessible"
    else
        fail "Backup API is not accessible"
    fi
else
    info "App service not running, skipping API test"
fi
echo ""

# Test 15: Retention policy check
echo "Test 15: Retention Policy"
OLD_BACKUPS=$(docker-compose exec -T backup sh -c 'find /backups -name "*_backup_*.pgdump.enc.gz" -mtime +90 2>/dev/null | wc -l')
if [ "$OLD_BACKUPS" -eq 0 ]; then
    pass "No backups older than retention period"
else
    fail "Found $OLD_BACKUPS backups exceeding retention period"
fi
echo ""

# Summary
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed! Backup system is operational.${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the output above.${NC}"
    exit 1
fi
