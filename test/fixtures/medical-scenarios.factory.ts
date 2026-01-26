import { faker } from '@faker-js/faker';
import {
  generatePatientDemographics,
  generateMedicalRecordData,
  AnonymizationOptions,
} from '../utils/data-anonymization.util';
import {
  generateSyntheticMedicalRecords,
  generateSyntheticMedicalHistory,
  generateSyntheticConsents,
} from './synthetic-data.generator';

/**
 * Medical Scenario Factories
 * 
 * Pre-configured medical scenarios for common testing workflows
 */

/**
 * New Patient Admission Scenario
 */
export function createNewPatientAdmissionScenario(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  
  return {
    patient: {
      ...patient,
      id: patientId,
      isAdmitted: true,
      admissionDate: new Date().toISOString().split('T')[0],
    },
    initialRecord: {
      ...generateMedicalRecordData(patientId, options),
      id: faker.string.uuid(),
      recordType: 'consultation',
      title: 'Initial Admission Assessment',
      description: 'Patient admitted for evaluation and treatment',
      recordDate: new Date(),
    },
    consent: {
      patientId,
      providerId: faker.string.uuid(),
      consentType: 'treatment',
      granted: true,
      grantedAt: new Date(),
    },
  };
}

/**
 * Emergency Department Visit Scenario
 */
export function createEmergencyVisitScenario(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  const recordId = faker.string.uuid();
  
  return {
    patient: {
      ...patient,
      id: patientId,
      isAdmitted: true,
      admissionDate: new Date().toISOString().split('T')[0],
    },
    emergencyRecord: {
      ...generateMedicalRecordData(patientId, options),
      id: recordId,
      recordType: 'emergency',
      title: 'Emergency Department Visit',
      description: faker.helpers.arrayElement([
        'Chest pain evaluation',
        'Acute abdominal pain',
        'Head injury assessment',
        'Respiratory distress',
      ]),
      recordDate: new Date(),
      metadata: {
        triageLevel: faker.helpers.arrayElement(['1', '2', '3', '4', '5']),
        arrivalMode: faker.helpers.arrayElement(['Ambulance', 'Walk-in', 'Police', 'Helicopter']),
        chiefComplaint: faker.lorem.sentence(),
      },
    },
    emergencyAccessLog: {
      medicalRecordId: recordId,
      patientId,
      eventType: 'viewed',
      eventDescription: 'Emergency access - life-threatening condition',
      performedBy: faker.string.uuid(),
      performedByName: faker.person.fullName(),
      eventDate: new Date(),
      emergencyReason: 'Life-threatening condition requiring immediate access',
      emergencyJustification: 'Patient unconscious, unable to provide consent',
      supervisorNotified: true,
      supervisorId: faker.string.uuid(),
    },
  };
}

/**
 * Routine Checkup Scenario
 */
export function createRoutineCheckupScenario(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  const recordId = faker.string.uuid();
  
  // Patient with existing history
  const previousRecords = generateSyntheticMedicalRecords(patientId, 3, options);
  
  return {
    patient: {
      ...patient,
      id: patientId,
      isAdmitted: false,
    },
    previousRecords: previousRecords.map((record, index) => ({
      ...record,
      id: faker.string.uuid(),
      recordDate: faker.date.past({ years: 1 }),
    })),
    checkupRecord: {
      ...generateMedicalRecordData(patientId, options),
      id: recordId,
      recordType: 'consultation',
      title: 'Annual Physical Examination',
      description: 'Routine annual checkup - patient in good health',
      recordDate: new Date(),
      metadata: {
        vitalSigns: {
          bloodPressure: '120/80',
          heartRate: faker.number.int({ min: 60, max: 100 }),
          temperature: faker.number.float({ min: 36.5, max: 37.5, fractionDigits: 1 }),
          weight: faker.number.int({ min: 50, max: 120 }),
          height: faker.number.int({ min: 150, max: 200 }),
        },
      },
    },
  };
}

/**
 * Chronic Disease Management Scenario
 */
export function createChronicDiseaseManagementScenario(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  
  const condition = faker.helpers.arrayElement([
    'Type 2 Diabetes',
    'Hypertension',
    'Asthma',
    'COPD',
    'Heart Failure',
  ]);
  
  // Multiple follow-up visits over time
  const followUpRecords = Array.from({ length: 6 }, (_, index) => {
    const recordId = faker.string.uuid();
    const visitDate = new Date();
    visitDate.setMonth(visitDate.getMonth() - (6 - index));
    
    return {
      ...generateMedicalRecordData(patientId, options),
      id: recordId,
      recordType: 'consultation',
      title: `${condition} Follow-up Visit`,
      description: `Regular monitoring and medication adjustment for ${condition}`,
      recordDate: visitDate,
      metadata: {
        condition,
        medications: faker.helpers.arrayElements([
          'Metformin',
          'Lisinopril',
          'Atorvastatin',
          'Aspirin',
          'Albuterol',
        ], { min: 1, max: 3 }),
      },
    };
  });
  
  return {
    patient: {
      ...patient,
      id: patientId,
      isAdmitted: false,
    },
    condition,
    followUpRecords,
    consents: generateSyntheticConsents(followUpRecords[0].id, patientId, 2, options),
  };
}

/**
 * Multi-Provider Consultation Scenario
 */
export function createMultiProviderConsultationScenario(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  
  const providers = [
    { id: faker.string.uuid(), name: faker.person.fullName(), specialty: 'Primary Care' },
    { id: faker.string.uuid(), name: faker.person.fullName(), specialty: 'Cardiology' },
    { id: faker.string.uuid(), name: faker.person.fullName(), specialty: 'Endocrinology' },
  ];
  
  const consultationRecords = providers.map(provider => {
    const recordId = faker.string.uuid();
    return {
      record: {
        ...generateMedicalRecordData(patientId, options),
        id: recordId,
        providerId: provider.id,
        recordType: 'consultation',
        title: `${provider.specialty} Consultation`,
        description: `Consultation with ${provider.name} (${provider.specialty})`,
        recordDate: faker.date.recent({ days: 30 }),
      },
      consent: {
        medicalRecordId: recordId,
        patientId,
        providerId: provider.id,
        consentType: 'disclosure',
        granted: true,
        grantedAt: faker.date.recent({ days: 35 }),
      },
      accessHistory: generateSyntheticMedicalHistory(recordId, patientId, 3, options),
    };
  });
  
  return {
    patient: {
      ...patient,
      id: patientId,
    },
    providers,
    consultationRecords,
  };
}

/**
 * Consent Revocation Scenario
 */
export function createConsentRevocationScenario(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  const recordId = faker.string.uuid();
  const providerId = faker.string.uuid();
  
  const grantedAt = faker.date.past({ years: 1 });
  const revokedAt = new Date();
  
  return {
    patient: {
      ...patient,
      id: patientId,
    },
    medicalRecord: {
      ...generateMedicalRecordData(patientId, options),
      id: recordId,
      providerId,
    },
    consent: {
      medicalRecordId: recordId,
      patientId,
      providerId,
      consentType: 'disclosure',
      granted: false,
      grantedAt,
      revokedAt,
    },
    revocationHistory: {
      medicalRecordId: recordId,
      patientId,
      eventType: 'consent_revoked',
      eventDescription: 'Patient revoked consent for data disclosure',
      performedBy: patientId,
      performedByName: `${patient.firstName} ${patient.lastName}`,
      eventDate: revokedAt,
    },
  };
}

/**
 * Data Breach Audit Scenario
 */
export function createDataBreachAuditScenario(options: AnonymizationOptions = {}) {
  const patient = generatePatientDemographics(options);
  const patientId = faker.string.uuid();
  const recordId = faker.string.uuid();
  
  // Suspicious access pattern
  const suspiciousAccess = Array.from({ length: 10 }, (_, index) => ({
    medicalRecordId: recordId,
    patientId,
    eventType: 'viewed',
    eventDescription: 'Record accessed',
    performedBy: faker.string.uuid(),
    performedByName: faker.person.fullName(),
    eventDate: new Date(Date.now() - index * 60000), // Every minute
    ipAddress: faker.internet.ipv4(),
    userAgent: faker.internet.userAgent(),
  }));
  
  return {
    patient: {
      ...patient,
      id: patientId,
    },
    medicalRecord: {
      ...generateMedicalRecordData(patientId, options),
      id: recordId,
    },
    suspiciousAccess,
    alert: {
      type: 'unusual_access_pattern',
      severity: 'high',
      description: 'Multiple rapid accesses detected',
      detectedAt: new Date(),
    },
  };
}
