#!/bin/bash
# Generate secure secrets for medical system deployment

SECRETS_DIR="./secrets"
mkdir -p $SECRETS_DIR

# Generate database password
openssl rand -base64 32 > $SECRETS_DIR/db_password.txt

# Generate Redis password
openssl rand -base64 32 > $SECRETS_DIR/redis_password.txt

# Generate JWT secret
openssl rand -base64 64 > $SECRETS_DIR/jwt_secret.txt

# Generate Grafana admin password
openssl rand -base64 32 > $SECRETS_DIR/grafana_password.txt

# Set proper permissions
chmod 600 $SECRETS_DIR/*.txt

echo "Secrets generated successfully in $SECRETS_DIR/"
echo "Database password: $(cat $SECRETS_DIR/db_password.txt)"
echo "Redis password: $(cat $SECRETS_DIR/redis_password.txt)"
echo "Grafana password: $(cat $SECRETS_DIR/grafana_password.txt)"