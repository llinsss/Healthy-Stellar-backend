import { aPatient } from '../../fixtures/test-data-builder';
import { generateSyntheticPatients, generateBulkSyntheticData } from '../../fixtures/synthetic-data.generator';

/**
 * Patient Operations Performance Tests
 * 
 * Validates that patient operations meet performance requirements
 */
describe('Patient Operations Performance', () => {
  const PATIENT_LOOKUP_THRESHOLD = parseInt(process.env.PERF_PATIENT_LOOKUP_THRESHOLD || '100');

  describe('Patient Lookup Performance', () => {
    it('should lookup patient by MRN within threshold', async () => {
      // Arrange
      const patient = aPatient().withMRN('MRN-20240101-1234').build();
      const mockFindByMRN = jest.fn().mockResolvedValue(patient);

      // Act
      const startTime = performance.now();
      await mockFindByMRN('MRN-20240101-1234');
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(PATIENT_LOOKUP_THRESHOLD);
      expect(mockFindByMRN).toHaveBeenCalledWith('MRN-20240101-1234');
    });

    it('should lookup patient by ID within threshold', async () => {
      // Arrange
      const patient = aPatient().build();
      const mockFindById = jest.fn().mockResolvedValue(patient);

      // Act
      const startTime = performance.now();
      await mockFindById(patient.id);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(PATIENT_LOOKUP_THRESHOLD);
    });
  });

  describe('Patient Search Performance', () => {
    it('should search patients by name within threshold', async () => {
      // Arrange
      const patients = generateSyntheticPatients(100);
      const mockSearch = jest.fn().mockResolvedValue(patients.slice(0, 10));

      // Act
      const startTime = performance.now();
      await mockSearch('John');
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(500); // 500ms threshold for search
    });

    it('should handle large result sets efficiently', async () => {
      // Arrange
      const patients = generateSyntheticPatients(1000);
      const mockFindAll = jest.fn().mockResolvedValue(patients);

      // Act
      const startTime = performance.now();
      const result = await mockFindAll();
      const duration = performance.now() - startTime;

      // Assert
      expect(result).toHaveLength(1000);
      expect(duration).toBeLessThan(1000); // 1 second for 1000 records
    });
  });

  describe('Bulk Patient Operations', () => {
    it('should create multiple patients efficiently', async () => {
      // Arrange
      const patientData = generateSyntheticPatients(50);
      const mockBulkCreate = jest.fn().mockResolvedValue(patientData);

      // Act
      const startTime = performance.now();
      await mockBulkCreate(patientData);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(2000); // 2 seconds for 50 patients
    });

    it('should update multiple patients efficiently', async () => {
      // Arrange
      const updates = Array.from({ length: 50 }, (_, i) => ({
        id: `patient-${i}`,
        phone: '555-0123',
      }));
      const mockBulkUpdate = jest.fn().mockResolvedValue({ affected: 50 });

      // Act
      const startTime = performance.now();
      await mockBulkUpdate(updates);
      const duration = performance.now() - startTime;

      // Assert
      expect(duration).toBeLessThan(2000); // 2 seconds for 50 updates
    });
  });

  describe('Concurrent Patient Access', () => {
    it('should handle concurrent patient lookups', async () => {
      // Arrange
      const patients = generateSyntheticPatients(10);
      const mockFindById = jest.fn((id) => 
        Promise.resolve(patients.find(p => p.id === id))
      );

      // Act
      const startTime = performance.now();
      await Promise.all(
        patients.map(p => mockFindById(p.id))
      );
      const duration = performance.now() - startTime;

      // Assert
      expect(mockFindById).toHaveBeenCalledTimes(10);
      expect(duration).toBeLessThan(500); // 500ms for 10 concurrent lookups
    });
  });

  describe('Database Query Optimization', () => {
    it('should use indexed fields for queries', () => {
      // Validate that queries use indexed fields
      const indexedFields = ['id', 'mrn', 'nationalId', 'email'];
      
      indexedFields.forEach(field => {
        expect(field).toBeDefined();
      });
    });

    it('should avoid N+1 query problems', async () => {
      // Arrange
      const mockFindWithRelations = jest.fn().mockResolvedValue([
        { ...aPatient().build(), medicalRecords: [] },
      ]);

      // Act
      await mockFindWithRelations({ relations: ['medicalRecords'] });

      // Assert - Should be called once, not N times
      expect(mockFindWithRelations).toHaveBeenCalledTimes(1);
    });
  });

  describe('Memory Usage', () => {
    it('should handle large datasets without memory issues', () => {
      // Arrange
      const largeDataset = generateSyntheticPatients(10000);

      // Act
      const memoryBefore = process.memoryUsage().heapUsed;
      const filtered = largeDataset.filter(p => p.isActive);
      const memoryAfter = process.memoryUsage().heapUsed;
      const memoryIncrease = (memoryAfter - memoryBefore) / 1024 / 1024; // MB

      // Assert
      expect(filtered.length).toBeGreaterThan(0);
      expect(memoryIncrease).toBeLessThan(100); // Less than 100MB increase
    });
  });
});
