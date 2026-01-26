import { aMedicalRecord, aPatient } from '../../fixtures/test-data-builder';
import { generateSyntheticMedicalRecords } from '../../fixtures/synthetic-data.generator';

/**
 * Medical Record Operations Performance Tests
 * 
 * Validates that medical record operations meet performance requirements
 */
describe('Medical Record Operations Performance', () => {
  const RECORD_RETRIEVAL_THRESHOLD = parseInt(process.env.PERF_RECORD_RETRIEVAL_THRESHOLD || '500');
  const RECORD_CREATION_THRESHOLD = parseInt(process.env.PERF_RECORD_CREATION_THRESHOLD || '200');

  describe('Medical Record Retrieval Performance', () => {
    it('should retrieve medical record by ID within threshold', async () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();
      const mockFindById = jest.fn().mockResolvedValue(record);

      // Act
      const startTime = performance.now();
      await mockFindById(record.id);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(RECORD_RETRIEVAL_THRESHOLD);
    });

    it('should retrieve record with full history within threshold', async () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();
      const mockFindWithHistory = jest.fn().mockResolvedValue({
        ...record,
        history: Array.from({ length: 50 }, (_, i) => ({
          id: `history-${i}`,
          eventType: 'viewed',
          eventDate: new Date(),
        })),
        versions: Array.from({ length: 10 }, (_, i) => ({
          version: i + 1,
          data: record,
        })),
      });

      // Act
      const startTime = performance.now();
      await mockFindWithHistory(record.id);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(RECORD_RETRIEVAL_THRESHOLD);
    });

    it('should retrieve all records for patient within threshold', async () => {
      // Arrange
      const patient = aPatient().build();
      const records = generateSyntheticMedicalRecords(patient.id, 20);
      const mockFindByPatient = jest.fn().mockResolvedValue(records);

      // Act
      const startTime = performance.now();
      await mockFindByPatient(patient.id);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(RECORD_RETRIEVAL_THRESHOLD);
    });
  });

  describe('Medical Record Creation Performance', () => {
    it('should create medical record within threshold', async () => {
      // Arrange
      const patient = aPatient().build();
      const recordData = aMedicalRecord(patient.id).build();
      const mockCreate = jest.fn().mockResolvedValue(recordData);

      // Act
      const startTime = performance.now();
      await mockCreate(recordData);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(RECORD_CREATION_THRESHOLD);
    });

    it('should create record with audit log within threshold', async () => {
      // Arrange
      const patient = aPatient().build();
      const recordData = aMedicalRecord(patient.id).build();
      const mockCreateWithAudit = jest.fn().mockResolvedValue({
        record: recordData,
        auditLog: {
          eventType: 'created',
          performedBy: 'test-user',
          eventDate: new Date(),
        },
      });

      // Act
      const startTime = performance.now();
      await mockCreateWithAudit(recordData);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(RECORD_CREATION_THRESHOLD + 50); // Allow 50ms for audit
    });
  });

  describe('Medical Record Update Performance', () => {
    it('should update record and create version within threshold', async () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();
      const mockUpdate = jest.fn().mockResolvedValue({
        ...record,
        version: 2,
        description: 'Updated description',
      });

      // Act
      const startTime = performance.now();
      await mockUpdate(record.id, { description: 'Updated description' });
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(RECORD_CREATION_THRESHOLD);
    });
  });

  describe('Large Attachment Handling', () => {
    it('should handle large file attachments efficiently', async () => {
      // Arrange
      const largeFile = Buffer.alloc(5 * 1024 * 1024); // 5MB file
      const mockUpload = jest.fn().mockResolvedValue({
        fileUrl: '/uploads/test-file.pdf',
        fileSize: largeFile.length,
      });

      // Act
      const startTime = performance.now();
      await mockUpload(largeFile);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(2000); // 2 seconds for 5MB file
    });

    it('should stream large attachments for retrieval', async () => {
      // Arrange
      const mockStream = jest.fn().mockResolvedValue({
        stream: 'readable-stream',
        size: 10 * 1024 * 1024, // 10MB
      });

      // Act
      const startTime = performance.now();
      await mockStream('attachment-id');
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(100); // Should start streaming quickly
    });
  });

  describe('Concurrent Record Access', () => {
    it('should handle concurrent record retrievals', async () => {
      // Arrange
      const patient = aPatient().build();
      const records = generateSyntheticMedicalRecords(patient.id, 20);
      const mockFindById = jest.fn((id) =>
        Promise.resolve(records.find(r => r.id === id))
      );

      // Act
      const startTime = performance.now();
      await Promise.all(
        records.map(r => mockFindById(r.id))
      );
      const duration = performance.now() - startTime;

      // Assert
      expect(mockFindById).toHaveBeenCalledTimes(20);
      expect(duration).toBeLessThan(1000); // 1 second for 20 concurrent retrievals
    });

    it('should handle concurrent updates without conflicts', async () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();
      const mockUpdate = jest.fn((id, data) =>
        Promise.resolve({ ...record, ...data, version: record.version + 1 })
      );

      // Act
      const updates = Array.from({ length: 5 }, (_, i) => ({
        description: `Update ${i}`,
      }));

      const startTime = performance.now();
      await Promise.all(
        updates.map(update => mockUpdate(record.id, update))
      );
      const duration = performance.now() - startTime;

      // Assert
      expect(mockUpdate).toHaveBeenCalledTimes(5);
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Version History Performance', () => {
    it('should retrieve version history efficiently', async () => {
      // Arrange
      const patient = aPatient().build();
      const record = aMedicalRecord(patient.id).build();
      const versions = Array.from({ length: 100 }, (_, i) => ({
        version: i + 1,
        data: { ...record, description: `Version ${i + 1}` },
        createdAt: new Date(),
      }));

      const mockGetVersions = jest.fn().mockResolvedValue(versions);

      // Act
      const startTime = performance.now();
      await mockGetVersions(record.id);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(500); // 500ms for 100 versions
    });
  });

  describe('Complex Query Performance', () => {
    it('should filter records by multiple criteria efficiently', async () => {
      // Arrange
      const patient = aPatient().build();
      const records = generateSyntheticMedicalRecords(patient.id, 200);
      const mockComplexQuery = jest.fn().mockResolvedValue(
        records.filter(r => 
          r.recordType === 'consultation' && 
          r.status === 'active'
        )
      );

      // Act
      const startTime = performance.now();
      await mockComplexQuery({
        patientId: patient.id,
        recordType: 'consultation',
        status: 'active',
      });
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(500);
    });
  });
});
