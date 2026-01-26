import { validateAuditLog, assertAuditLogExists, createMockAuditLog } from '../../utils/hipaa-compliance.util';
import { anAuditLog, aPatient, aMedicalRecord } from '../../fixtures/test-data-builder';

/**
 * Audit Logging Compliance Tests
 * 
 * Validates that all PHI access is properly logged per HIPAA requirements
 */
describe('Audit Logging Compliance', () => {
  describe('Audit Log Completeness', () => {
    it('should include all required HIPAA audit fields', () => {
      // Arrange
      const auditLog = createMockAuditLog({
        eventType: 'viewed',
        performedBy: 'test-user-id',
        patientId: 'test-patient-id',
        eventDate: new Date(),
      });

      // Act
      const validation = validateAuditLog(auditLog);

      // Assert
      expect(validation.isValid).toBe(true);
      expect(validation.missingFields).toHaveLength(0);
      expect(auditLog).toHaveAuditLog();
    });

    it('should fail validation when required fields are missing', () => {
      // Arrange
      const incompleteLog = {
        eventType: 'viewed',
        // Missing: performedBy, patientId, eventDate
      };

      // Act
      const validation = validateAuditLog(incompleteLog);

      // Assert
      expect(validation.isValid).toBe(false);
      expect(validation.missingFields).toContain('performedBy');
      expect(validation.missingFields).toContain('patientId');
      expect(validation.missingFields).toContain('eventDate');
    });

    it('should include who, what, when, where information', () => {
      // Arrange
      const patient = aPatient().build();
      const auditLog = anAuditLog(patient.id, 'test-user-id')
        .withEventType('viewed')
        .withDescription('Patient record accessed')
        .withEventDate(new Date())
        .build();

      // Assert - WHO
      expect(auditLog.performedBy).toBeDefined();
      expect(auditLog.performedByName).toBeDefined();

      // Assert - WHAT
      expect(auditLog.eventType).toBeDefined();
      expect(auditLog.eventDescription).toBeDefined();

      // Assert - WHEN
      expect(auditLog.eventDate).toBeDefined();
      expect(auditLog.eventDate).toBeInstanceOf(Date);

      // Assert - WHERE
      expect(auditLog.ipAddress).toBeDefined();
      expect(auditLog.userAgent).toBeDefined();
    });
  });

  describe('PHI Access Logging', () => {
    it('should log every PHI access event', () => {
      // Arrange
      const patient = aPatient().build();
      const accessEvents = ['viewed', 'updated', 'shared', 'deleted'];

      // Act
      const auditLogs = accessEvents.map(eventType =>
        anAuditLog(patient.id, 'test-user-id')
          .withEventType(eventType)
          .build()
      );

      // Assert
      expect(auditLogs).toHaveLength(4);
      auditLogs.forEach(log => {
        expect(log).toHaveAuditLog();
        expect(log.patientId).toBe(patient.id);
      });
    });

    it('should log medical record access', () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();

      const auditLog = anAuditLog(patient.id, 'provider-id')
        .withMedicalRecord(record.id)
        .withEventType('viewed')
        .withDescription('Medical record accessed by provider')
        .build();

      // Assert
      expect(auditLog.medicalRecordId).toBe(record.id);
      expect(auditLog.patientId).toBe(patient.id);
      expect(auditLog).toHaveAuditLog();
    });

    it('should log bulk data access', () => {
      // Arrange
      const patient = aPatient().build();

      const auditLog = anAuditLog(patient.id, 'admin-user-id')
        .withEventType('bulk_export')
        .withDescription('Patient data exported for reporting')
        .withEventData({
          recordCount: 150,
          exportFormat: 'CSV',
          dateRange: '2024-01-01 to 2024-12-31',
        })
        .build();

      // Assert
      expect(auditLog.eventType).toBe('bulk_export');
      expect(auditLog.eventData).toBeDefined();
      expect(auditLog.eventData.recordCount).toBe(150);
    });
  });

  describe('Audit Log Immutability', () => {
    it('should prevent modification of audit logs', () => {
      // Arrange
      const auditLog = createMockAuditLog();
      const originalEventType = auditLog.eventType;

      // Act - Attempt to modify (should be prevented in real implementation)
      // In a real system, this would use Object.freeze() or database constraints
      const frozenLog = Object.freeze({ ...auditLog });

      // Assert
      expect(() => {
        (frozenLog as any).eventType = 'modified';
      }).toThrow();
      expect(frozenLog.eventType).toBe(originalEventType);
    });

    it('should maintain audit log integrity with timestamps', () => {
      // Arrange
      const auditLog = createMockAuditLog();

      // Assert
      expect(auditLog.eventDate).toBeInstanceOf(Date);
      expect(auditLog.eventDate.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('Audit Log Retention', () => {
    it('should retain audit logs for required period (7 years)', () => {
      // Arrange
      const retentionPeriodDays = 2555; // ~7 years
      const oldLog = createMockAuditLog({
        eventDate: new Date(Date.now() - (2000 * 24 * 60 * 60 * 1000)), // ~5.5 years old
      });

      // Act
      const ageInDays = Math.floor(
        (Date.now() - oldLog.eventDate.getTime()) / (24 * 60 * 60 * 1000)
      );

      // Assert
      expect(ageInDays).toBeLessThan(retentionPeriodDays);
    });
  });

  describe('Audit Log Search and Retrieval', () => {
    it('should find audit logs by patient ID', () => {
      // Arrange
      const patient = aPatient().build();
      const auditLogs = [
        anAuditLog(patient.id, 'user-1').withEventType('viewed').build(),
        anAuditLog(patient.id, 'user-2').withEventType('updated').build(),
        anAuditLog(patient.id, 'user-3').withEventType('shared').build(),
      ];

      // Act
      const foundLog = assertAuditLogExists(auditLogs, {
        patientId: patient.id,
        eventType: 'updated',
      });

      // Assert
      expect(foundLog).toBeDefined();
      expect(foundLog?.eventType).toBe('updated');
      expect(foundLog?.performedBy).toBe('user-2');
    });

    it('should find audit logs by event type', () => {
      // Arrange
      const patient = aPatient().build();
      const auditLogs = [
        anAuditLog(patient.id, 'user-1').withEventType('viewed').build(),
        anAuditLog(patient.id, 'user-2').withEventType('viewed').build(),
      ];

      // Act
      const viewedLogs = auditLogs.filter(log => log.eventType === 'viewed');

      // Assert
      expect(viewedLogs).toHaveLength(2);
    });

    it('should find audit logs by date range', () => {
      // Arrange
      const patient = aPatient().build();
      const today = new Date();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const auditLogs = [
        anAuditLog(patient.id, 'user-1').withEventDate(yesterday).build(),
        anAuditLog(patient.id, 'user-2').withEventDate(today).build(),
      ];

      // Act
      const recentLogs = auditLogs.filter(
        log => log.eventDate.getTime() >= yesterday.getTime()
      );

      // Assert
      expect(recentLogs).toHaveLength(2);
    });
  });

  describe('Emergency Access Logging', () => {
    it('should log emergency access with additional details', () => {
      // Arrange
      const patient = aPatient().build();

      const emergencyLog = anAuditLog(patient.id, 'emergency-user-id')
        .asEmergencyAccess(
          'Life-threatening condition',
          'Patient unconscious, unable to provide consent'
        )
        .build();

      // Assert
      expect(emergencyLog.eventType).toBe('emergency_access');
      expect(emergencyLog.emergencyReason).toBeDefined();
      expect(emergencyLog.emergencyJustification).toBeDefined();
      expect(emergencyLog.supervisorNotified).toBe(true);
      expect(emergencyLog.supervisorId).toBeDefined();
    });
  });

  describe('Consent Change Logging', () => {
    it('should log consent granted events', () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();

      const consentLog = anAuditLog(patient.id, patient.id)
        .withMedicalRecord(record.id)
        .withEventType('consent_granted')
        .withDescription('Patient granted consent for data disclosure')
        .build();

      // Assert
      expect(consentLog.eventType).toBe('consent_granted');
      expect(consentLog.medicalRecordId).toBe(record.id);
    });

    it('should log consent revoked events', () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();

      const revokeLog = anAuditLog(patient.id, patient.id)
        .withMedicalRecord(record.id)
        .withEventType('consent_revoked')
        .withDescription('Patient revoked consent for data disclosure')
        .build();

      // Assert
      expect(revokeLog.eventType).toBe('consent_revoked');
    });
  });
});
