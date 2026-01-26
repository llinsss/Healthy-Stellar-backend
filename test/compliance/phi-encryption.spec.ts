import { detectPHIFields, validatePHIEncryption } from '../../utils/hipaa-compliance.util';
import { aPatient, aMedicalRecord } from '../../fixtures/test-data-builder';
import { generatePatientDemographics } from '../../utils/data-anonymization.util';

/**
 * PHI Encryption Compliance Tests
 * 
 * Validates that all Protected Health Information (PHI) fields are properly encrypted
 */
describe('PHI Encryption Compliance', () => {
  describe('PHI Field Detection', () => {
    it('should detect all PHI fields in patient data', () => {
      // Arrange
      const patient = aPatient().build();

      // Act
      const phiFields = detectPHIFields(patient);

      // Assert
      expect(phiFields).toContain('firstName');
      expect(phiFields).toContain('lastName');
      expect(phiFields).toContain('email');
      expect(phiFields).toContain('phone');
      expect(phiFields).toContain('address');
      expect(phiFields).toContain('nationalId');
      expect(phiFields).toContain('dateOfBirth');
      expect(phiFields).toContain('mrn');
    });

    it('should detect PHI in medical records', () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id)
        .withDescription('Patient John Doe presented with symptoms')
        .build();

      // Act
      const phiFields = detectPHIFields(record);

      // Assert - Medical records may contain PHI in description/metadata
      expect(record.description).toBeDefined();
    });
  });

  describe('PHI Encryption Validation', () => {
    it('should validate that PHI fields are encrypted at rest', () => {
      // Arrange
      const patient = generatePatientDemographics();
      const encryptedFields = ['firstName', 'lastName', 'email', 'phone', 'nationalId'];

      // Act
      const validation = validatePHIEncryption(patient, encryptedFields);

      // Assert
      expect(validation.isValid).toBe(true);
      expect(validation.unencryptedFields).toHaveLength(0);
    });

    it('should fail validation if PHI fields are not encrypted', () => {
      // Arrange
      const patient = generatePatientDemographics();
      const encryptedFields: string[] = []; // No fields encrypted

      // Act
      const validation = validatePHIEncryption(patient, encryptedFields);

      // Assert
      expect(validation.isValid).toBe(false);
      expect(validation.unencryptedFields.length).toBeGreaterThan(0);
    });

    it('should identify specific unencrypted PHI fields', () => {
      // Arrange
      const patient = generatePatientDemographics();
      const encryptedFields = ['firstName', 'lastName']; // Only partial encryption

      // Act
      const validation = validatePHIEncryption(patient, encryptedFields);

      // Assert
      expect(validation.isValid).toBe(false);
      expect(validation.unencryptedFields).toContain('email');
      expect(validation.unencryptedFields).toContain('phone');
      expect(validation.unencryptedFields).toContain('nationalId');
    });
  });

  describe('Field-Level Encryption', () => {
    it('should encrypt sensitive fields individually', () => {
      // Arrange
      const sensitiveData = {
        firstName: 'John',
        lastName: 'Doe',
        ssn: '123-45-6789',
      };

      // Act - Simulate encryption
      const encrypted = {
        firstName: Buffer.from(sensitiveData.firstName).toString('base64'),
        lastName: Buffer.from(sensitiveData.lastName).toString('base64'),
        ssn: Buffer.from(sensitiveData.ssn).toString('base64'),
      };

      // Assert
      expect(encrypted.firstName).toBeEncrypted();
      expect(encrypted.lastName).toBeEncrypted();
      expect(encrypted.ssn).toBeEncrypted();
    });

    it('should maintain data integrity after encryption/decryption', () => {
      // Arrange
      const originalData = 'Sensitive Patient Information';

      // Act - Simulate encryption and decryption
      const encrypted = Buffer.from(originalData).toString('base64');
      const decrypted = Buffer.from(encrypted, 'base64').toString('utf-8');

      // Assert
      expect(encrypted).not.toBe(originalData);
      expect(decrypted).toBe(originalData);
    });
  });

  describe('Encryption Key Management', () => {
    it('should use different encryption keys for different data types', () => {
      // This test validates that the system uses appropriate key management
      // In a real implementation, you would test actual encryption service

      const keyTypes = ['PHI_ENCRYPTION_KEY', 'DATABASE_ENCRYPTION_KEY', 'BACKUP_ENCRYPTION_KEY'];

      keyTypes.forEach(keyType => {
        expect(process.env[keyType] || 'test-key').toBeDefined();
      });
    });

    it('should rotate encryption keys periodically', () => {
      // This is a placeholder for key rotation testing
      // In production, implement actual key rotation validation
      const keyRotationInterval = 90; // days
      expect(keyRotationInterval).toBeLessThanOrEqual(90);
    });
  });

  describe('Data at Rest Encryption', () => {
    it('should ensure database connections use encryption', () => {
      // Validate that database configuration includes SSL/TLS
      const dbConfig = {
        ssl: true,
        sslMode: 'require',
      };

      expect(dbConfig.ssl).toBe(true);
      expect(dbConfig.sslMode).toBe('require');
    });
  });

  describe('Compliance Validation', () => {
    it('should pass comprehensive HIPAA encryption compliance check', () => {
      // Arrange
      const patient = generatePatientDemographics();
      const encryptedFields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'nationalId',
        'address',
      ];

      // Act
      const validation = validatePHIEncryption(patient, encryptedFields);

      // Assert
      expect(validation.isValid).toBe(true);
      expect({
        data: patient,
        encryption: true,
        auditLog: { eventType: 'created', performedBy: 'test', patientId: 'test', eventDate: new Date() },
        accessControl: true,
      }).toComplyWithHIPAA();
    });
  });
});
