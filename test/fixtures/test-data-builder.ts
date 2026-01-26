import { faker } from '@faker-js/faker';
import { generatePatientDemographics, AnonymizationOptions } from '../utils/data-anonymization.util';

/**
 * Fluent Test Data Builders
 * 
 * Provides a fluent interface for building test data with chainable methods
 */

/**
 * Patient Builder
 */
export class PatientBuilder {
  private patient: any;
  
  constructor(options: AnonymizationOptions = {}) {
    this.patient = generatePatientDemographics(options);
    this.patient.id = faker.string.uuid();
  }
  
  withId(id: string): this {
    this.patient.id = id;
    return this;
  }
  
  withMRN(mrn: string): this {
    this.patient.mrn = mrn;
    return this;
  }
  
  withName(firstName: string, lastName: string, middleName?: string): this {
    this.patient.firstName = firstName;
    this.patient.lastName = lastName;
    if (middleName) this.patient.middleName = middleName;
    return this;
  }
  
  withDateOfBirth(dateOfBirth: string): this {
    this.patient.dateOfBirth = dateOfBirth;
    return this;
  }
  
  withSex(sex: 'male' | 'female' | 'other' | 'unknown'): this {
    this.patient.sex = sex;
    return this;
  }
  
  withBloodGroup(bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'): this {
    this.patient.bloodGroup = bloodGroup;
    return this;
  }
  
  withAllergies(allergies: string[]): this {
    this.patient.knownAllergies = allergies;
    return this;
  }
  
  withContact(phone: string, email: string): this {
    this.patient.phone = phone;
    this.patient.email = email;
    return this;
  }
  
  withAddress(address: any): this {
    this.patient.address = address;
    return this;
  }
  
  admitted(admissionDate?: string): this {
    this.patient.isAdmitted = true;
    this.patient.admissionDate = admissionDate || new Date().toISOString().split('T')[0];
    return this;
  }
  
  discharged(dischargeDate?: string): this {
    this.patient.isAdmitted = false;
    this.patient.dischargeDate = dischargeDate || new Date().toISOString().split('T')[0];
    return this;
  }
  
  inactive(): this {
    this.patient.isActive = false;
    return this;
  }
  
  build(): any {
    return { ...this.patient };
  }
}

/**
 * Medical Record Builder
 */
export class MedicalRecordBuilder {
  private record: any;
  
  constructor(patientId: string) {
    this.record = {
      id: faker.string.uuid(),
      patientId,
      providerId: faker.string.uuid(),
      createdBy: faker.string.uuid(),
      recordType: 'other',
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      status: 'active',
      recordDate: new Date(),
      metadata: {},
      version: 1,
    };
  }
  
  withId(id: string): this {
    this.record.id = id;
    return this;
  }
  
  withProvider(providerId: string): this {
    this.record.providerId = providerId;
    return this;
  }
  
  withType(recordType: string): this {
    this.record.recordType = recordType;
    return this;
  }
  
  withTitle(title: string): this {
    this.record.title = title;
    return this;
  }
  
  withDescription(description: string): this {
    this.record.description = description;
    return this;
  }
  
  withStatus(status: 'active' | 'archived' | 'deleted'): this {
    this.record.status = status;
    return this;
  }
  
  withRecordDate(date: Date): this {
    this.record.recordDate = date;
    return this;
  }
  
  withMetadata(metadata: Record<string, any>): this {
    this.record.metadata = { ...this.record.metadata, ...metadata };
    return this;
  }
  
  archived(): this {
    this.record.status = 'archived';
    return this;
  }
  
  deleted(): this {
    this.record.status = 'deleted';
    return this;
  }
  
  build(): any {
    return { ...this.record };
  }
}

/**
 * Consent Builder
 */
export class ConsentBuilder {
  private consent: any;
  
  constructor(medicalRecordId: string, patientId: string, providerId: string) {
    this.consent = {
      medicalRecordId,
      patientId,
      providerId,
      consentType: 'treatment',
      granted: true,
      grantedAt: new Date(),
      revokedAt: null,
      expiresAt: null,
      consentDocument: faker.lorem.paragraphs(2),
    };
  }
  
  forTreatment(): this {
    this.consent.consentType = 'treatment';
    return this;
  }
  
  forDisclosure(): this {
    this.consent.consentType = 'disclosure';
    return this;
  }
  
  forResearch(): this {
    this.consent.consentType = 'research';
    return this;
  }
  
  forMarketing(): this {
    this.consent.consentType = 'marketing';
    return this;
  }
  
  granted(grantedAt?: Date): this {
    this.consent.granted = true;
    this.consent.grantedAt = grantedAt || new Date();
    this.consent.revokedAt = null;
    return this;
  }
  
  revoked(revokedAt?: Date): this {
    this.consent.granted = false;
    this.consent.revokedAt = revokedAt || new Date();
    return this;
  }
  
  expiresAt(expiresAt: Date): this {
    this.consent.expiresAt = expiresAt;
    return this;
  }
  
  withDocument(document: string): this {
    this.consent.consentDocument = document;
    return this;
  }
  
  build(): any {
    return { ...this.consent };
  }
}

/**
 * Audit Log Builder
 */
export class AuditLogBuilder {
  private log: any;
  
  constructor(patientId: string, performedBy: string) {
    this.log = {
      id: faker.string.uuid(),
      patientId,
      eventType: 'viewed',
      eventDescription: '',
      performedBy,
      performedByName: faker.person.fullName(),
      eventDate: new Date(),
      ipAddress: faker.internet.ipv4(),
      userAgent: faker.internet.userAgent(),
      metadata: {},
    };
  }
  
  withMedicalRecord(medicalRecordId: string): this {
    this.log.medicalRecordId = medicalRecordId;
    return this;
  }
  
  withEventType(eventType: string): this {
    this.log.eventType = eventType;
    return this;
  }
  
  withDescription(description: string): this {
    this.log.eventDescription = description;
    return this;
  }
  
  withPerformer(performedBy: string, performedByName: string): this {
    this.log.performedBy = performedBy;
    this.log.performedByName = performedByName;
    return this;
  }
  
  withEventDate(eventDate: Date): this {
    this.log.eventDate = eventDate;
    return this;
  }
  
  withEventData(eventData: Record<string, any>): this {
    this.log.eventData = eventData;
    return this;
  }
  
  withMetadata(metadata: Record<string, any>): this {
    this.log.metadata = { ...this.log.metadata, ...metadata };
    return this;
  }
  
  asEmergencyAccess(reason: string, justification: string): this {
    this.log.eventType = 'emergency_access';
    this.log.emergencyReason = reason;
    this.log.emergencyJustification = justification;
    this.log.supervisorNotified = true;
    this.log.supervisorId = faker.string.uuid();
    return this;
  }
  
  build(): any {
    return { ...this.log };
  }
}

/**
 * Helper functions to create builders
 */
export function aPatient(options?: AnonymizationOptions): PatientBuilder {
  return new PatientBuilder(options);
}

export function aMedicalRecord(patientId: string): MedicalRecordBuilder {
  return new MedicalRecordBuilder(patientId);
}

export function aConsent(
  medicalRecordId: string,
  patientId: string,
  providerId: string
): ConsentBuilder {
  return new ConsentBuilder(medicalRecordId, patientId, providerId);
}

export function anAuditLog(patientId: string, performedBy: string): AuditLogBuilder {
  return new AuditLogBuilder(patientId, performedBy);
}
