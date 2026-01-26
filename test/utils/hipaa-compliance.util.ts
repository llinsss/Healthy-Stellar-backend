/**
 * HIPAA Compliance Testing Utilities
 * 
 * Utilities for validating HIPAA compliance in tests
 */

/**
 * PHI (Protected Health Information) field identifiers
 */
export const PHI_FIELDS = [
  'firstName',
  'lastName',
  'middleName',
  'email',
  'phone',
  'address',
  'nationalId',
  'dateOfBirth',
  'mrn',
  'patientPhotoUrl',
] as const;

export type PHIField = typeof PHI_FIELDS[number];

/**
 * Detect PHI fields in an object
 */
export function detectPHIFields(obj: Record<string, any>): PHIField[] {
  const detectedFields: PHIField[] = [];
  
  PHI_FIELDS.forEach(field => {
    if (field in obj && obj[field] !== null && obj[field] !== undefined) {
      detectedFields.push(field);
    }
  });
  
  return detectedFields;
}

/**
 * Validate that PHI fields are encrypted
 */
export function validatePHIEncryption(
  obj: Record<string, any>,
  encryptedFields: string[] = []
): { isValid: boolean; unencryptedFields: string[] } {
  const phiFields = detectPHIFields(obj);
  const unencryptedFields = phiFields.filter(field => !encryptedFields.includes(field));
  
  return {
    isValid: unencryptedFields.length === 0,
    unencryptedFields,
  };
}

/**
 * Audit log entry interface
 */
export interface AuditLogEntry {
  id?: string;
  eventType: string;
  eventDescription?: string;
  performedBy: string;
  performedByName?: string;
  patientId: string;
  medicalRecordId?: string;
  eventDate: Date;
  eventData?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

/**
 * Validate audit log completeness
 */
export function validateAuditLog(
  auditLog: Partial<AuditLogEntry>
): { isValid: boolean; missingFields: string[] } {
  const requiredFields: (keyof AuditLogEntry)[] = [
    'eventType',
    'performedBy',
    'patientId',
    'eventDate',
  ];
  
  const missingFields = requiredFields.filter(
    field => !(field in auditLog) || auditLog[field] === null || auditLog[field] === undefined
  );
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Audit log assertion helper
 */
export function assertAuditLogExists(
  auditLogs: AuditLogEntry[],
  criteria: Partial<AuditLogEntry>
): AuditLogEntry | null {
  return auditLogs.find(log => {
    return Object.entries(criteria).every(([key, value]) => {
      return log[key as keyof AuditLogEntry] === value;
    });
  }) || null;
}

/**
 * Access control validation
 */
export interface AccessControlContext {
  userId: string;
  userRole: string;
  patientId: string;
  action: 'read' | 'write' | 'delete' | 'share';
  resourceType: 'patient' | 'medical_record' | 'consent';
}

/**
 * Validate minimum necessary access principle
 */
export function validateMinimumNecessaryAccess(
  requestedFields: string[],
  necessaryFields: string[]
): { isValid: boolean; excessiveFields: string[] } {
  const excessiveFields = requestedFields.filter(field => !necessaryFields.includes(field));
  
  return {
    isValid: excessiveFields.length === 0,
    excessiveFields,
  };
}

/**
 * Session timeout validation (HIPAA requires 15 minutes inactivity timeout)
 */
export function validateSessionTimeout(
  lastActivityTime: Date,
  currentTime: Date = new Date(),
  maxInactivityMinutes: number = 15
): { isValid: boolean; minutesInactive: number } {
  const inactivityMs = currentTime.getTime() - lastActivityTime.getTime();
  const minutesInactive = Math.floor(inactivityMs / (60 * 1000));
  
  return {
    isValid: minutesInactive <= maxInactivityMinutes,
    minutesInactive,
  };
}

/**
 * Data retention validation
 */
export function validateDataRetention(
  recordDate: Date,
  retentionPeriodDays: number = 2555, // ~7 years for HIPAA
  currentDate: Date = new Date()
): { shouldRetain: boolean; daysOld: number } {
  const ageMs = currentDate.getTime() - recordDate.getTime();
  const daysOld = Math.floor(ageMs / (24 * 60 * 60 * 1000));
  
  return {
    shouldRetain: daysOld <= retentionPeriodDays,
    daysOld,
  };
}

/**
 * Consent validation helper
 */
export interface ConsentRecord {
  patientId: string;
  providerId: string;
  consentType: 'treatment' | 'disclosure' | 'research' | 'marketing';
  granted: boolean;
  grantedAt?: Date;
  revokedAt?: Date;
  expiresAt?: Date;
}

/**
 * Validate consent before data access
 */
export function validateConsent(
  consent: ConsentRecord,
  currentDate: Date = new Date()
): { isValid: boolean; reason?: string } {
  if (!consent.granted) {
    return { isValid: false, reason: 'Consent not granted' };
  }
  
  if (consent.revokedAt && consent.revokedAt <= currentDate) {
    return { isValid: false, reason: 'Consent has been revoked' };
  }
  
  if (consent.expiresAt && consent.expiresAt <= currentDate) {
    return { isValid: false, reason: 'Consent has expired' };
  }
  
  return { isValid: true };
}

/**
 * Emergency access validation
 * HIPAA allows emergency access but requires strict logging
 */
export interface EmergencyAccessLog extends AuditLogEntry {
  emergencyReason: string;
  emergencyJustification: string;
  supervisorNotified: boolean;
  supervisorId?: string;
}

/**
 * Validate emergency access log
 */
export function validateEmergencyAccess(
  log: Partial<EmergencyAccessLog>
): { isValid: boolean; violations: string[] } {
  const violations: string[] = [];
  
  if (!log.emergencyReason) {
    violations.push('Missing emergency reason');
  }
  
  if (!log.emergencyJustification) {
    violations.push('Missing emergency justification');
  }
  
  if (!log.supervisorNotified) {
    violations.push('Supervisor not notified of emergency access');
  }
  
  // Validate base audit log fields
  const auditValidation = validateAuditLog(log);
  if (!auditValidation.isValid) {
    violations.push(`Missing audit fields: ${auditValidation.missingFields.join(', ')}`);
  }
  
  return {
    isValid: violations.length === 0,
    violations,
  };
}

/**
 * Helper to create mock audit log entry
 */
export function createMockAuditLog(
  overrides: Partial<AuditLogEntry> = {}
): AuditLogEntry {
  return {
    eventType: 'viewed',
    performedBy: 'test-user-id',
    performedByName: 'Test User',
    patientId: 'test-patient-id',
    eventDate: new Date(),
    ipAddress: '127.0.0.1',
    userAgent: 'test-agent',
    ...overrides,
  };
}
