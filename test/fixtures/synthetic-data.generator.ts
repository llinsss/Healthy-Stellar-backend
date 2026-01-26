import { faker } from '@faker-js/faker';
import {
  generatePatientDemographics,
  generateMedicalRecordData,
  generateClinicalNotes,
  AnonymizationOptions,
} from '../utils/data-anonymization.util';

/**
 * Synthetic Medical Data Generator
 * 
 * Generates realistic but completely synthetic medical data for testing
 */

/**
 * Generate a batch of synthetic patients
 */
export function generateSyntheticPatients(
  count: number,
  options: AnonymizationOptions = {}
): any[] {
  const patients: any[] = [];
  
  for (let i = 0; i < count; i++) {
    patients.push(generatePatientDemographics(options));
  }
  
  return patients;
}

/**
 * Generate synthetic medical records for a patient
 */
export function generateSyntheticMedicalRecords(
  patientId: string,
  count: number,
  options: AnonymizationOptions = {}
): any[] {
  const records: any[] = [];
  
  for (let i = 0; i < count; i++) {
    records.push(generateMedicalRecordData(patientId, options));
  }
  
  return records;
}

/**
 * Generate synthetic medical history entries
 */
export function generateSyntheticMedicalHistory(
  medicalRecordId: string,
  patientId: string,
  count: number,
  options: AnonymizationOptions = {}
): any[] {
  const history: any[] = [];
  
  for (let i = 0; i < count; i++) {
    history.push({
      medicalRecordId,
      patientId,
      eventType: faker.helpers.arrayElement([
        'created',
        'updated',
        'viewed',
        'shared',
        'consent_granted',
        'consent_revoked',
      ]),
      eventDescription: faker.lorem.sentence(),
      performedBy: faker.string.uuid(),
      performedByName: faker.person.fullName(),
      eventDate: faker.date.recent({ days: 30 }),
      ipAddress: faker.internet.ipv4(),
      userAgent: faker.internet.userAgent(),
    });
  }
  
  return history;
}

/**
 * Generate synthetic consent records
 */
export function generateSyntheticConsents(
  medicalRecordId: string,
  patientId: string,
  count: number = 1,
  options: AnonymizationOptions = {}
): any[] {
  const consents: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const granted = faker.datatype.boolean();
    const grantedAt = faker.date.past({ years: 1 });
    
    consents.push({
      medicalRecordId,
      patientId,
      providerId: faker.string.uuid(),
      consentType: faker.helpers.arrayElement(['treatment', 'disclosure', 'research', 'marketing']),
      granted,
      grantedAt: granted ? grantedAt : null,
      revokedAt: granted && faker.datatype.boolean({ probability: 0.2 }) 
        ? faker.date.between({ from: grantedAt, to: new Date() })
        : null,
      expiresAt: faker.date.future({ years: 1 }),
      consentDocument: faker.lorem.paragraphs(2),
    });
  }
  
  return consents;
}

/**
 * Generate synthetic clinical note templates
 */
export function generateSyntheticClinicalNoteTemplates(
  count: number,
  options: AnonymizationOptions = {}
): any[] {
  const templates: any[] = [];
  
  const templateTypes = [
    'SOAP Note',
    'Progress Note',
    'Discharge Summary',
    'Consultation Note',
    'Procedure Note',
    'Emergency Note',
  ];
  
  for (let i = 0; i < count; i++) {
    templates.push({
      name: faker.helpers.arrayElement(templateTypes),
      description: faker.lorem.sentence(),
      template: generateClinicalNotes(options),
      specialty: faker.helpers.arrayElement([
        'General Practice',
        'Cardiology',
        'Neurology',
        'Pediatrics',
        'Surgery',
        'Emergency Medicine',
      ]),
      isActive: true,
      createdBy: faker.string.uuid(),
    });
  }
  
  return templates;
}

/**
 * Generate synthetic medical attachments
 */
export function generateSyntheticMedicalAttachments(
  medicalRecordId: string,
  count: number,
  options: AnonymizationOptions = {}
): any[] {
  const attachments: any[] = [];
  
  const fileTypes = [
    { type: 'image/jpeg', extension: 'jpg', category: 'imaging' },
    { type: 'image/png', extension: 'png', category: 'imaging' },
    { type: 'application/pdf', extension: 'pdf', category: 'document' },
    { type: 'application/dicom', extension: 'dcm', category: 'imaging' },
  ];
  
  for (let i = 0; i < count; i++) {
    const fileType = faker.helpers.arrayElement(fileTypes);
    
    attachments.push({
      medicalRecordId,
      fileName: `${faker.system.fileName()}.${fileType.extension}`,
      fileType: fileType.type,
      fileSize: faker.number.int({ min: 1024, max: 10485760 }), // 1KB to 10MB
      fileUrl: `/uploads/test/${faker.string.uuid()}.${fileType.extension}`,
      category: fileType.category,
      description: faker.lorem.sentence(),
      uploadedBy: faker.string.uuid(),
      uploadedAt: faker.date.recent({ days: 30 }),
    });
  }
  
  return attachments;
}

/**
 * Generate a complete patient dataset with related records
 */
export function generateCompletePatientDataset(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  
  const medicalRecords = generateSyntheticMedicalRecords(patientId, 3, options);
  const medicalRecordIds = medicalRecords.map(() => faker.string.uuid());
  
  const history = medicalRecordIds.flatMap(recordId => 
    generateSyntheticMedicalHistory(recordId, patientId, 2, options)
  );
  
  const consents = medicalRecordIds.flatMap(recordId => 
    generateSyntheticConsents(recordId, patientId, 1, options)
  );
  
  const attachments = medicalRecordIds.flatMap(recordId => 
    generateSyntheticMedicalAttachments(recordId, 2, options)
  );
  
  return {
    patient: { ...patient, id: patientId },
    medicalRecords: medicalRecords.map((record, index) => ({
      ...record,
      id: medicalRecordIds[index],
      patientId,
    })),
    history,
    consents,
    attachments,
  };
}

/**
 * Generate bulk synthetic data for performance testing
 */
export function generateBulkSyntheticData(
  patientCount: number,
  recordsPerPatient: number = 5,
  options: AnonymizationOptions = {}
) {
  const patients: any[] = [];
  const medicalRecords: any[] = [];
  const history: any[] = [];
  
  for (let i = 0; i < patientCount; i++) {
    const patient = generatePatientDemographics(options);
    const patientId = faker.string.uuid();
    patients.push({ ...patient, id: patientId });
    
    for (let j = 0; j < recordsPerPatient; j++) {
      const record = generateMedicalRecordData(patientId, options);
      const recordId = faker.string.uuid();
      medicalRecords.push({ ...record, id: recordId, patientId });
      
      // Add some history entries
      history.push(...generateSyntheticMedicalHistory(recordId, patientId, 2, options));
    }
  }
  
  return {
    patients,
    medicalRecords,
    history,
  };
}
