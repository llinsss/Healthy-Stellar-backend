/**
 * Custom Jest Matchers for HIPAA-Compliant Medical Testing
 * 
 * These matchers help validate that medical data handling meets HIPAA requirements
 */

import { validateNoRealPHI } from './data-anonymization.util';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAnonymized(): R;
      toHaveAuditLog(expectedFields?: string[]): R;
      toBeEncrypted(): R;
      toComplyWithHIPAA(): R;
      toHavePHIProtection(): R;
    }
  }
}

/**
 * Matcher to verify data is properly anonymized
 */
export const toBeAnonymized = function(received: any) {
  const validation = validateNoRealPHI(received);
  
  if (validation.isValid) {
    return {
      message: () => `expected data to contain real PHI, but it was properly anonymized`,
      pass: true,
    };
  } else {
    return {
      message: () => 
        `expected data to be anonymized, but found potential PHI:\n${validation.violations.join('\n')}`,
      pass: false,
    };
  }
};

/**
 * Matcher to verify audit log exists with required fields
 */
export const toHaveAuditLog = function(
  received: any,
  expectedFields: string[] = ['eventType', 'performedBy', 'eventDate', 'patientId']
) {
  const missingFields = expectedFields.filter(field => !(field in received));
  
  if (missingFields.length === 0) {
    return {
      message: () => `expected audit log to be missing fields, but all required fields are present`,
      pass: true,
    };
  } else {
    return {
      message: () => 
        `expected audit log to have all required fields, but missing: ${missingFields.join(', ')}`,
      pass: false,
    };
  }
};

/**
 * Matcher to verify data is encrypted
 * Checks if the value doesn't match common patterns and appears to be encrypted
 */
export const toBeEncrypted = function(received: string) {
  if (typeof received !== 'string') {
    return {
      message: () => `expected value to be a string, but received ${typeof received}`,
      pass: false,
    };
  }
  
  // Encrypted data should not contain readable text patterns
  const hasReadableText = /\b[a-z]{4,}\b/i.test(received);
  const hasEncryptedPattern = /^[A-Za-z0-9+/=]+$/.test(received) || /^[0-9a-f]+$/.test(received);
  const isLongEnough = received.length > 20;
  
  const isEncrypted = !hasReadableText && hasEncryptedPattern && isLongEnough;
  
  if (isEncrypted) {
    return {
      message: () => `expected value to be unencrypted, but it appears to be encrypted`,
      pass: true,
    };
  } else {
    return {
      message: () => 
        `expected value to be encrypted, but it appears to be plain text: "${received.substring(0, 50)}..."`,
      pass: false,
    };
  }
};

/**
 * Comprehensive HIPAA compliance check
 */
export const toComplyWithHIPAA = function(received: {
  data?: any;
  auditLog?: any;
  encryption?: boolean;
  accessControl?: boolean;
}) {
  const violations: string[] = [];
  
  // Check data anonymization
  if (received.data) {
    const validation = validateNoRealPHI(received.data);
    if (!validation.isValid) {
      violations.push(...validation.violations);
    }
  }
  
  // Check audit log presence
  if (!received.auditLog) {
    violations.push('Missing audit log');
  } else {
    const requiredFields = ['eventType', 'performedBy', 'eventDate', 'patientId'];
    const missingFields = requiredFields.filter(field => !(field in received.auditLog));
    if (missingFields.length > 0) {
      violations.push(`Audit log missing fields: ${missingFields.join(', ')}`);
    }
  }
  
  // Check encryption
  if (received.encryption === false) {
    violations.push('PHI encryption not enabled');
  }
  
  // Check access control
  if (received.accessControl === false) {
    violations.push('Access control not enforced');
  }
  
  if (violations.length === 0) {
    return {
      message: () => `expected data to violate HIPAA, but it is compliant`,
      pass: true,
    };
  } else {
    return {
      message: () => 
        `expected data to comply with HIPAA, but found violations:\n${violations.join('\n')}`,
      pass: false,
    };
  }
};

/**
 * Matcher to verify PHI fields have appropriate protection
 */
export const toHavePHIProtection = function(
  received: any,
  phiFields: string[] = ['firstName', 'lastName', 'email', 'phone', 'nationalId', 'address']
) {
  const violations: string[] = [];
  
  phiFields.forEach(field => {
    if (field in received) {
      const value = received[field];
      
      // Check if the field exists but is not protected
      if (typeof value === 'string' && value.length > 0) {
        // For now, we just check that it's anonymized
        const validation = validateNoRealPHI({ [field]: value });
        if (!validation.isValid) {
          violations.push(`Field '${field}' may contain real PHI`);
        }
      }
    }
  });
  
  if (violations.length === 0) {
    return {
      message: () => `expected PHI fields to be unprotected, but they are properly protected`,
      pass: true,
    };
  } else {
    return {
      message: () => 
        `expected PHI fields to be protected, but found issues:\n${violations.join('\n')}`,
      pass: false,
    };
  }
};

// Export all matchers
export const customMatchers = {
  toBeAnonymized,
  toHaveAuditLog,
  toBeEncrypted,
  toComplyWithHIPAA,
  toHavePHIProtection,
};
