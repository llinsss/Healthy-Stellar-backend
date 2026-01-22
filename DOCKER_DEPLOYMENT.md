# Docker Deployment Guide - Hospital Management System

## 🏥 Medical-Grade Docker Configuration

This Docker setup provides a production-ready, secure, and monitored deployment for the hospital management system with medical data encryption and automated backups.

## 🚀 Quick Start

```bash
# Generate secure secrets
./generate-secrets.sh

# Deploy the complete system
./deploy.sh
```

## 📋 Services Overview

| Service | Port | Purpose |
|---------|------|---------|
| Medical API | 3000 | Main NestJS application |
| Grafana | 3001 | Medical system monitoring dashboard |
| Prometheus | 9090 | Metrics collection |
| PostgreSQL | 5432 | Encrypted medical database |
| Redis | 6379 | Session management |
| Loki | 3100 | Log aggregation |

## 🔐 Security Features

### Data Encryption
- **At Rest**: PostgreSQL with pgcrypto extension
- **In Transit**: SSL/TLS for all connections
- **Secrets**: Docker secrets management
- **Authentication**: SCRAM-SHA-256 for database

### Medical Data Protection
- Encrypted medical record storage
- Audit logging for all operations
- Secure session management with Redis
- IP address tracking for compliance

## 💾 Backup & Recovery

### Automated Backups
- Daily database backups at 2 AM
- Weekly backup integrity tests
- 30-day retention policy
- Compressed storage

### Manual Operations
```bash
# Create backup
docker-compose exec backup /backup.sh backup

# Test backup integrity
docker-compose exec backup /backup.sh test

# Restore from backup
docker-compose exec postgres pg_restore -h localhost -U medical_user -d healthy_stellar /backups/medical_db_YYYYMMDD_HHMMSS.backup
```

## 📊 Monitoring & Alerts

### Medical-Grade Monitoring
- Real-time system health monitoring
- Database performance metrics
- Application response times
- Security event tracking

### Access Dashboards
- **Grafana**: http://localhost:3001 (admin/[generated-password])
- **Prometheus**: http://localhost:9090

## 🔧 Configuration

### Environment Variables
All sensitive configuration is managed through Docker secrets:
- Database credentials
- JWT secrets
- Redis passwords
- Grafana admin password

### Custom Configuration
Edit `docker-compose.yml` to modify:
- Resource limits
- Network configuration
- Volume mounts
- Service dependencies

## 🏥 Medical Compliance

### HIPAA Considerations
- Encrypted data storage and transmission
- Comprehensive audit logging
- Access control and authentication
- Secure backup and recovery procedures

### Audit Trail
All medical record operations are logged with:
- User identification
- Timestamp
- IP address
- Operation type
- Data changes (before/after)

## 🚨 Health Checks

The system includes comprehensive health monitoring:
- Application health endpoint: `/health`
- Database connectivity checks
- Redis session store validation
- Automated service recovery

## 📝 Maintenance

### Regular Tasks
```bash
# View logs
docker-compose logs -f app

# Check service status
docker-compose ps

# Update services
docker-compose pull && docker-compose up -d

# Clean up old images
docker system prune -f
```

### Scaling
```bash
# Scale application instances
docker-compose up -d --scale app=3
```

## 🔍 Troubleshooting

### Common Issues
1. **Service won't start**: Check logs with `docker-compose logs [service]`
2. **Database connection**: Verify secrets are generated
3. **Backup failures**: Check disk space and permissions
4. **Monitoring issues**: Ensure all services are healthy

### Debug Mode
```bash
# Run with debug logging
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
```

## 📋 Production Checklist

- [ ] Secrets generated and secured
- [ ] SSL certificates configured
- [ ] Backup storage configured
- [ ] Monitoring alerts set up
- [ ] Network security configured
- [ ] Resource limits set
- [ ] Log rotation configured
- [ ] Disaster recovery plan tested