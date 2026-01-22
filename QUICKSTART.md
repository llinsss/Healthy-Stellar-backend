# Quick Start Guide - Healthcare Authentication System

## 🚀 Getting Started

### 1. Environment Setup

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Update critical secrets:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-characters
REFRESH_TOKEN_SECRET=your-super-secret-refresh-key-change-this-in-production
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Build the Project

```bash
npm run build
```

Expected output: **✅ Zero errors**

### 4. Run Development Server

```bash
npm run start:dev
```

Server will start on `http://localhost:3000`

---

## 📝 Common API Examples

### Register a Patient

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "SecurePass123!@#",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Register Healthcare Staff (with MFA requirement)

```bash
curl -X POST http://localhost:3000/auth/register/staff \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "password": "SecurePass123!@#",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "physician",
    "npi": "1234567890",
    "licenseNumber": "MD-123456"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "SecurePass123!@#"
  }'
```

Response includes:
```json
{
  "user": { "id": "uuid", "email": "...", "role": "patient", "mfaEnabled": false },
  "tokens": { "accessToken": "jwt...", "refreshToken": "jwt...", "expiresIn": 900 }
}
```

### Setup MFA for Healthcare Staff

```bash
curl -X POST http://localhost:3000/auth/mfa/setup \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{ "deviceName": "iPhone Authenticator" }'
```

Response includes:
- `secret` - QR code data
- `qrCode` - Base64 PNG for display
- `backupCodes` - Recovery codes (SAVE THESE!)

### Verify MFA Code

```bash
curl -X POST http://localhost:3000/auth/mfa/verify-code \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{ "code": "123456" }'
```

### Get Current User

```bash
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer {accessToken}"
```

### Change Password

```bash
curl -X POST http://localhost:3000/auth/change-password \
  -H "Authorization: Bearer {accessToken}" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "OldPass123!@#",
    "newPassword": "NewSecurePass123!@#",
    "confirmPassword": "NewSecurePass123!@#"
  }'
```

### Refresh Token

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{ "refreshToken": "{refreshToken}" }'
```

### Logout

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer {accessToken}"
```

### Get All Sessions

```bash
curl -X GET http://localhost:3000/auth/sessions \
  -H "Authorization: Bearer {accessToken}"
```

### Revoke All Other Sessions

```bash
curl -X POST http://localhost:3000/auth/sessions/revoke-all \
  -H "Authorization: Bearer {accessToken}"
```

---

## 🔒 Using Guards in Controllers

### JWT Authentication Required

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('api/medical-records')
export class MedicalRecordsController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getRecords(@Req() req) {
    const userId = (req.user as JwtPayload).userId;
    // Only authenticated users can access
  }
}
```

### Role-Based Access

```typescript
import { Roles } from './auth/decorators/roles.decorator';
import { RolesGuard } from './auth/guards/roles.guard';
import { UserRole } from './auth/entities/user.entity';

@Controller('api/admin')
export class AdminController {
  @Post('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createUser(@Body() dto: CreateUserDto) {
    // Only admins can create users
  }
  
  @Get('reports')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PHYSICIAN)
  getReports() {
    // Only admins and physicians can access
  }
}
```

### MFA Required (Healthcare Staff)

```typescript
import { MfaVerifiedGuard } from './auth/guards/mfa-verified.guard';

@Controller('api/sensitive')
export class SensitiveController {
  @Post('prescribe')
  @UseGuards(JwtAuthGuard, MfaVerifiedGuard)
  prescribeMedication(@Body() dto: PrescriptionDto) {
    // Requires MFA verification
  }
}
```

---

## 📊 Monitoring & Debugging

### Check Audit Logs

Access `AuditLogEntity` through database queries:
```sql
SELECT * FROM audit_logs 
WHERE action = 'LOGIN' 
ORDER BY createdAt DESC 
LIMIT 10;
```

### Check Active Sessions

```sql
SELECT id, userId, ipAddress, createdAt, expiresAt 
FROM sessions 
WHERE isActive = true;
```

### Check User Account Status

```sql
SELECT id, email, isActive, mfaEnabled, failedLoginAttempts, lockedUntil 
FROM users;
```

---

## ✅ Security Checklist

- [ ] Change JWT_SECRET in .env
- [ ] Change REFRESH_TOKEN_SECRET in .env
- [ ] Enable HTTPS in production
- [ ] Review audit logs regularly
- [ ] Rotate secrets periodically
- [ ] Update dependencies: `npm audit fix`
- [ ] Test MFA backup codes functionality
- [ ] Test session timeout enforcement
- [ ] Test password expiration
- [ ] Verify rate limiting is active

---

## 🐛 Troubleshooting

### "Invalid token" error
- Token has expired (15 min max)
- Use refresh endpoint to get new token
- Check JWT_SECRET matches between encoding/decoding

### MFA code not working
- Device clock is not synchronized
- Code is older than 30 seconds
- User hasn't enabled MFA yet

### Account is locked
- Too many failed login attempts
- Wait 30 minutes or contact admin
- Check audit logs for failed attempts

### Session timeout issues
- Activity needs to be tracked
- Each request resets the 15-minute timer
- Can't resume after logout

---

## 📚 Documentation

- **Full API Documentation**: `AUTH_SYSTEM.md`
- **Implementation Details**: `AUTHENTICATION_IMPLEMENTATION.md`
- **Environment Configuration**: `.env.example`

---

## 🆘 Support

For issues:
1. Check the documentation files
2. Review audit logs for error details
3. Verify environment variables are set correctly
4. Ensure database is properly configured

For security concerns: Report privately to the dev team (do not open public issues).

---

## 📋 Compliance Notes

✅ HIPAA § 164.312(a)(2)(i) - Access Control  
✅ HIPAA § 164.312(b) - Audit Controls  
✅ HIPAA § 164.312(c)(1) - Integrity  
✅ OWASP Authentication Best Practices  
✅ NIST SP 800-63 Password Guidelines  

---

**Version**: 1.0.0  
**Last Updated**: January 22, 2026  
**Status**: Production Ready ✅
