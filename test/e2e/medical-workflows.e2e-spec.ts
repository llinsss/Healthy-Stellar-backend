import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { TestDatabaseHelper } from '../config/test-database.config';
import {
  createNewPatientAdmissionScenario,
  createEmergencyVisitScenario,
  createMultiProviderConsultationScenario,
} from '../fixtures/medical-scenarios.factory';
import { Patient } from '../../src/patients/entities/patient.entity';
import { MedicalRecord } from '../../src/medical-records/entities/medical-record.entity';

/**
 * End-to-End Medical Workflow Tests
 * 
 * Tests complete medical workflows from admission to discharge
 */
describe('Medical Workflows (E2E)', () => {
  let app: INestApplication<App>;
  let dbHelper: TestDatabaseHelper;

  beforeAll(async () => {
    // Initialize test database
    dbHelper = new TestDatabaseHelper();
    await dbHelper.initialize('e2e');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await dbHelper.cleanup();
  });

  beforeEach(async () => {
    // Clear database before each test
    await dbHelper.clear();
  });

  describe('Patient Admission Workflow', () => {
    it('should complete full patient admission workflow', async () => {
      // Arrange
      const scenario = createNewPatientAdmissionScenario();

      // Act - Create patient
      const patientResponse = await request(app.getHttpServer())
        .post('/patients')
        .send(scenario.patient)
        .expect(201);

      expect(patientResponse.body).toHaveProperty('id');
      expect(patientResponse.body.isAdmitted).toBe(true);
      expect(patientResponse.body).toBeAnonymized();

      // Act - Create initial medical record
      const recordResponse = await request(app.getHttpServer())
        .post('/medical-records')
        .send({
          ...scenario.initialRecord,
          patientId: patientResponse.body.id,
        })
        .expect(201);

      expect(recordResponse.body).toHaveProperty('id');
      expect(recordResponse.body.recordType).toBe('consultation');

      // Act - Grant consent
      const consentResponse = await request(app.getHttpServer())
        .post('/consents')
        .send({
          ...scenario.consent,
          patientId: patientResponse.body.id,
        })
        .expect(201);

      expect(consentResponse.body.granted).toBe(true);

      // Assert - Verify audit logs were created
      const auditResponse = await request(app.getHttpServer())
        .get(`/audit-logs?patientId=${patientResponse.body.id}`)
        .expect(200);

      expect(auditResponse.body.length).toBeGreaterThan(0);
      auditResponse.body.forEach((log: any) => {
        expect(log).toHaveAuditLog();
      });
    });
  });

  describe('Emergency Department Visit Workflow', () => {
    it('should handle emergency access with proper logging', async () => {
      // Arrange
      const scenario = createEmergencyVisitScenario();

      // Act - Create patient (emergency admission)
      const patientResponse = await request(app.getHttpServer())
        .post('/patients')
        .send(scenario.patient)
        .expect(201);

      // Act - Create emergency record
      const recordResponse = await request(app.getHttpServer())
        .post('/medical-records')
        .send({
          ...scenario.emergencyRecord,
          patientId: patientResponse.body.id,
        })
        .expect(201);

      expect(recordResponse.body.recordType).toBe('emergency');

      // Act - Log emergency access
      await request(app.getHttpServer())
        .post('/audit-logs/emergency-access')
        .send({
          ...scenario.emergencyAccessLog,
          patientId: patientResponse.body.id,
          medicalRecordId: recordResponse.body.id,
        })
        .expect(201);

      // Assert - Verify emergency access was properly logged
      const auditResponse = await request(app.getHttpServer())
        .get(`/audit-logs?patientId=${patientResponse.body.id}&eventType=viewed`)
        .expect(200);

      const emergencyLog = auditResponse.body.find(
        (log: any) => log.emergencyReason
      );
      expect(emergencyLog).toBeDefined();
      expect(emergencyLog.supervisorNotified).toBe(true);
    });
  });

  describe('Multi-Provider Consultation Workflow', () => {
    it('should manage multi-provider access with consent', async () => {
      // Arrange
      const scenario = createMultiProviderConsultationScenario();

      // Act - Create patient
      const patientResponse = await request(app.getHttpServer())
        .post('/patients')
        .send(scenario.patient)
        .expect(201);

      const patientId = patientResponse.body.id;

      // Act - Create consultation records for each provider
      for (const consultation of scenario.consultationRecords) {
        // Create medical record
        const recordResponse = await request(app.getHttpServer())
          .post('/medical-records')
          .send({
            ...consultation.record,
            patientId,
          })
          .expect(201);

        // Grant consent for provider
        await request(app.getHttpServer())
          .post('/consents')
          .send({
            ...consultation.consent,
            patientId,
            medicalRecordId: recordResponse.body.id,
          })
          .expect(201);
      }

      // Assert - Verify all providers have access
      const recordsResponse = await request(app.getHttpServer())
        .get(`/medical-records?patientId=${patientId}`)
        .expect(200);

      expect(recordsResponse.body.length).toBe(scenario.consultationRecords.length);

      // Assert - Verify consents exist for all providers
      const consentsResponse = await request(app.getHttpServer())
        .get(`/consents?patientId=${patientId}`)
        .expect(200);

      expect(consentsResponse.body.length).toBe(scenario.consultationRecords.length);
      consentsResponse.body.forEach((consent: any) => {
        expect(consent.granted).toBe(true);
      });
    });
  });

  describe('Medical Record Updates and Versioning', () => {
    it('should maintain version history on updates', async () => {
      // Arrange
      const scenario = createNewPatientAdmissionScenario();

      // Create patient and initial record
      const patientResponse = await request(app.getHttpServer())
        .post('/patients')
        .send(scenario.patient)
        .expect(201);

      const recordResponse = await request(app.getHttpServer())
        .post('/medical-records')
        .send({
          ...scenario.initialRecord,
          patientId: patientResponse.body.id,
        })
        .expect(201);

      const recordId = recordResponse.body.id;

      // Act - Update record multiple times
      await request(app.getHttpServer())
        .patch(`/medical-records/${recordId}`)
        .send({ description: 'First update' })
        .expect(200);

      await request(app.getHttpServer())
        .patch(`/medical-records/${recordId}`)
        .send({ description: 'Second update' })
        .expect(200);

      // Assert - Verify version history
      const versionResponse = await request(app.getHttpServer())
        .get(`/medical-records/${recordId}/versions`)
        .expect(200);

      expect(versionResponse.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Data Anonymization Validation', () => {
    it('should ensure all API responses use anonymized data', async () => {
      // Arrange
      const scenario = createNewPatientAdmissionScenario();

      // Act
      const patientResponse = await request(app.getHttpServer())
        .post('/patients')
        .send(scenario.patient)
        .expect(201);

      // Assert
      expect(patientResponse.body).toBeAnonymized();
      expect(patientResponse.body).toHavePHIProtection();
    });
  });
});
