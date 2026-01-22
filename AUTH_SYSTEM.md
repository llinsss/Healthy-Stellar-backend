# Healthcare-Compliant Authentication System

## Overview

This is a production-ready, healthcare-compliant authentication system built for the Healthy Stellar backend. It implements security standards required by HIPAA and other healthcare regulations.

## Key Features

### ✅ Multi-Factor Authentication (MFA)
- **TOTP-based (Time-based One-Time Password)** authentication using industry-standard algorithms
- **QR Code generation** for easy authenticator app setup
- **Backup codes** (8 codes) for account recovery
- **Device management** - track and manage multiple MFA devices
- **Verification codes** with 30-second time windows

### ✅ Role-Based Access Control (RBAC)
- **User Roles**: Admin, Physician, Nurse, Patient, Billing Staff, Medical Records Staff
- **Permission system** for fine-grained access control
- **Role-based guards** to protect endpoints
- Healthcare staff can be assigned specific roles with appropriate permissions

### ✅ Password Security (HIPAA § 164.312(a)(2)(i))
- **Argon2 hashing** (more secure than bcrypt for healthcare)
- **Strong password requirements**:
  - Minimum 12 characters
  - Mix of uppercase, lowercase, numbers, and special characters
  - Cannot contain sequential/repeated characters
  - No common dictionary words
- **Password expiration**: 90 days (HIPAA requirement)
- **Password history**: Cannot reuse last 12 passwords
- **Account lockout**: 5 failed attempts = 30-minute lockout

### ✅ Session Management
- **Access tokens**: 15-minute expiration (short-lived)
- **Refresh tokens**: 7-day expiration for session renewal
- **Session timeout**: 15 minutes of inactivity (HIPAA requirement)
- **Multiple concurrent sessions**: Up to 5 per user
- **Session revocation**: Can revoke specific sessions or all sessions at once
- **Session tracking**: IP address, user agent, device ID logging

### ✅ Comprehensive Audit Logging (HIPAA § 164.312(b))
All authentication events are logged with:
- User ID and email
- Action (login, logout, MFA enable, password change, etc.)
- Success/failure status
- IP address and user agent
- Timestamp
- Metadata for investigation
- Severity levels (LOW, MEDIUM, HIGH, CRITICAL)

### ✅ Security Features
- **JWT signing** with HS512 algorithm
- **Rate limiting** and throttling
- **CORS protection**
- **Security headers** via helmet
- **Account lockout** after failed login attempts
- **Password reset** functionality
- **Inactive session cleanup**

## Installation

The authentication system is pre-configured and included in the application. However, ensure all dependencies are installed:

```bash
npm install --legacy-peer-deps
```

## Configuration

Create a `.env` file in the project root with the following variables:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-characters
JWT_EXPIRATION=15m
REFRESH_TOKEN_SECRET=your-super-secret-refresh-key-change-this-in-production
REFRESH_TOKEN_EXPIRATION=7d

# Session Management
SESSION_TIMEOUT_MINUTES=15
MAX_SESSIONS_PER_USER=5

# Password Policy
PASSWORD_MIN_LENGTH=12
PASSWORD_EXPIRATION_DAYS=90
PASSWORD_HISTORY_COUNT=12
LOCKOUT_THRESHOLD=5
LOCKOUT_DURATION_MINUTES=30

# MFA
MFA_REQUIRED_FOR_STAFF=true
MFA_TIME_WINDOW=30
BACKUP_CODES_COUNT=8

# Database
DB_TYPE=sqlite
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=healthy_stellar
```

See `.env.example` for more configuration options.

## API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!@#",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Register Healthcare Staff
```http
POST /auth/register/staff
Content-Type: application/json

{
  "email": "doctor@example.com",
  "password": "SecurePass123!@#",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "physician",
  "npi": "1234567890",
  "licenseNumber": "MD123456"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!@#"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "patient",
    "mfaEnabled": false
  },
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 900
  }
}
```

#### Change Password
```http
POST /auth/change-password
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "currentPassword": "OldPass123!@#",
  "newPassword": "NewSecurePass123!@#",
  "confirmPassword": "NewSecurePass123!@#"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {accessToken}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer {accessToken}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

### MFA Endpoints

#### Initialize MFA Setup
```http
POST /auth/mfa/setup
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "deviceName": "My Authenticator"
}
```

**Response:**
```json
{
  "secret": "JBSWY3DPEBLW64TMMQ",
  "qrCode": "data:image/png;base64,iVBORw0K...",
  "backupCodes": [
    "ABC123XY",
    "DEF456ZW",
    "..."
  ],
  "message": "Scan QR code with authenticator app and verify the code"
}
```

#### Verify and Enable MFA
```http
POST /auth/mfa/verify
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "verificationCode": "123456",
  "deviceName": "My Authenticator"
}
```

#### Verify MFA Code
```http
POST /auth/mfa/verify-code
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "code": "123456"
}
```

#### Get MFA Devices
```http
GET /auth/mfa/devices
Authorization: Bearer {accessToken}
```

#### Regenerate Backup Codes
```http
POST /auth/mfa/backup-codes/regenerate
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "verificationCode": "123456"
}
```

#### Disable MFA
```http
POST /auth/mfa/disable
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "verificationCode": "123456"
}
```

### Session Management Endpoints

#### Get All Sessions
```http
GET /auth/sessions
Authorization: Bearer {accessToken}
```

#### Revoke Specific Session
```http
POST /auth/sessions/:sessionId/revoke
Authorization: Bearer {accessToken}
```

#### Revoke All Other Sessions
```http
POST /auth/sessions/revoke-all
Authorization: Bearer {accessToken}
```

## Security Guards

### JWT Auth Guard
Validates JWT token and session validity:
```typescript
@UseGuards(JwtAuthGuard)
async getProtectedResource() {
  // Only accessible with valid JWT token
}
```

### Roles Guard
Restricts access based on user role:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.PHYSICIAN, UserRole.ADMIN)
async getMedicalRecords() {
  // Only physicians and admins can access
}
```

### MFA Verified Guard
Requires MFA verification:
```typescript
@UseGuards(JwtAuthGuard, MfaVerifiedGuard)
async sensitiveOperation() {
  // Requires MFA to be verified
}
```

## Database Entities

### User Entity
- ID (UUID)
- Email (unique)
- Password hash (Argon2)
- First/Last name
- Role (RBAC)
- MFA enabled status
- Failed login attempts
- Account lockout status
- Password expiration tracking
- Professional details (NPI, license number for staff)
- Permissions array
- Timestamps (created, updated, deleted)

### MFA Entity
- ID (UUID)
- User reference
- TOTP secret
- Backup codes (array)
- Verification status
- Device name
- Last used timestamp
- Primary device flag

### Session Entity
- ID (UUID)
- User reference
- Access and refresh tokens
- Token expiration dates
- IP address and user agent
- Device ID
- Active status
- Revocation timestamp

### Audit Log Entity
- ID (UUID)
- User reference
- Action (enum)
- Description
- IP address and user agent
- Metadata (JSON)
- Resource reference
- Severity level
- Investigation flag
- Timestamp

## HIPAA Compliance

This authentication system implements the following HIPAA requirements:

1. **Access Control (§ 164.312(a)(2)(i))**
   - Unique user ID and emergency access procedures
   - Encryption and decryption mechanisms
   - Transmission security

2. **Audit Controls (§ 164.312(b))**
   - Comprehensive logging of authentication events
   - Audit log retention for investigation
   - High-risk event tracking

3. **Integrity (§ 164.312(c)(1))**
   - Argon2 hashing for password security
   - JWT signing with HS512 algorithm
   - Session integrity monitoring

4. **Person or Entity Authentication (§ 164.312(a)(2)(i))**
   - Multi-factor authentication for medical staff
   - Strong password policies
   - Account lockout mechanisms

5. **Emergency Access Procedure (§ 164.312(a)(2)(i))**
   - Backup codes for MFA recovery
   - Session management and revocation

## Best Practices

### For Users
1. **Never share your MFA backup codes** - store them securely
2. **Use a strong, unique password** - follow the password requirements
3. **Enable MFA** - required for healthcare staff, optional but recommended for patients
4. **Regularly review active sessions** - revoke sessions on unfamiliar devices
5. **Log out after use** - especially on shared computers

### For Developers
1. **Never log sensitive data** - passwords, tokens, backup codes
2. **Rotate secrets regularly** - JWT_SECRET, REFRESH_TOKEN_SECRET
3. **Monitor audit logs** - investigate high-risk events
4. **Update dependencies** - keep security libraries current
5. **Test authentication flows** - ensure guards are working correctly

## Service Architecture

### AuthService
Main authentication service handling:
- User registration and login
- Password management
- User profile updates

### PasswordValidationService
Healthcare-grade password validation:
- Strong password enforcement
- Password expiration checking
- History management (prevents reuse)

### AuthTokenService
JWT token generation and verification:
- Access token generation
- Refresh token management
- Token pair creation

### MfaService
Multi-factor authentication management:
- TOTP setup and verification
- QR code generation
- Backup code management

### SessionManagementService
Session lifecycle management:
- Session creation and revocation
- Expiration tracking
- Activity monitoring

### AuditService
Comprehensive audit logging:
- Authentication event logging
- Data access tracking
- Investigation support

## Testing

Run tests:
```bash
npm test
```

Run with coverage:
```bash
npm run test:cov
```

Run e2e tests:
```bash
npm run test:e2e
```

## Troubleshooting

### Invalid Token Error
- Ensure token hasn't expired (15 minutes)
- Use refresh endpoint to get new token
- Check JWT_SECRET configuration

### MFA Code Invalid
- Ensure device time is synchronized
- Check code hasn't expired (30 seconds)
- Use backup code if available

### Account Locked
- Wait 30 minutes for automatic unlock
- Contact administrator for manual unlock

### Session Expired
- Use refresh token to get new session
- Re-authenticate if needed

## Security Considerations

1. **Environment Variables**: Always use strong, random values for secrets
2. **HTTPS Only**: Always use HTTPS in production
3. **Rate Limiting**: Implemented to prevent brute force attacks
4. **Token Storage**: Store tokens securely on the client (httpOnly cookies recommended)
5. **Regular Audits**: Review audit logs regularly for suspicious activity

## Support

For security issues, please report privately to the development team. Do not open public issues for security vulnerabilities.
