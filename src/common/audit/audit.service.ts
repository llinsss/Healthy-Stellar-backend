import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogEntity, AuditAction } from './audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLogEntity)
    private auditLogRepository: Repository<AuditLogEntity>,
  ) {}

  /**
   * Log authentication events
   */
  async logAuthenticationEvent(
    action: AuditAction | string,
    success: boolean,
    metadata: {
      userId?: string;
      email?: string;
      sessionId?: string;
      ipAddress?: string;
      userAgent?: string;
      reason?: string;
      description?: string;
      severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
      [key: string]: any;
    },
  ): Promise<AuditLogEntity> {
    const auditAction = typeof action === 'string' ? (action as AuditAction) : action;
    const log = this.auditLogRepository.create({
      userId: metadata.userId || null,
      action: auditAction,
      description: metadata.description || `${auditAction} - ${success ? 'Success' : 'Failed'}`,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
      metadata: {
        ...metadata,
        success,
      },
      resourceType: 'AUTH',
      severity: metadata.severity || (success ? 'LOW' : 'MEDIUM'),
      requiresInvestigation: !success && auditAction === AuditAction.UNAUTHORIZED_ACCESS_ATTEMPT,
    });

    return this.auditLogRepository.save(log);
  }

  /**
   * Log data access event
   */
  async logDataAccess(
    userId: string,
    resourceType: string,
    resourceId: string,
    ipAddress: string,
    userAgent: string,
    metadata?: Record<string, any>,
  ): Promise<AuditLogEntity> {
    const log = this.auditLogRepository.create({
      userId,
      action: AuditAction.DATA_ACCESS,
      description: `Accessed ${resourceType} (${resourceId})`,
      ipAddress,
      userAgent,
      resourceId,
      resourceType,
      metadata,
      severity: 'LOW',
    });

    return this.auditLogRepository.save(log);
  }

  /**
   * Log data export event
   */
  async logDataExport(
    userId: string,
    resourceType: string,
    resourceIds: string[],
    ipAddress: string,
    userAgent: string,
    metadata?: Record<string, any>,
  ): Promise<AuditLogEntity> {
    const log = this.auditLogRepository.create({
      userId,
      action: AuditAction.DATA_EXPORT,
      description: `Exported ${resourceIds.length} ${resourceType} records`,
      ipAddress,
      userAgent,
      resourceType,
      metadata: {
        ...metadata,
        exportedCount: resourceIds.length,
        resourceIds,
      },
      severity: 'MEDIUM',
    });

    return this.auditLogRepository.save(log);
  }

  /**
   * Log user management events
   */
  async logUserManagement(
    userId: string,
    action: AuditAction,
    targetUserId: string,
    ipAddress: string,
    userAgent: string,
    metadata?: Record<string, any>,
  ): Promise<AuditLogEntity> {
    const log = this.auditLogRepository.create({
      userId,
      action,
      description: `${action} for user ${targetUserId}`,
      ipAddress,
      userAgent,
      resourceId: targetUserId,
      resourceType: 'USER',
      metadata,
      severity: 'MEDIUM',
    });

    return this.auditLogRepository.save(log);
  }

  /**
   * Get audit logs for investigation
   */
  async getAuditLogs(
    filters?: {
      userId?: string;
      action?: AuditAction;
      startDate?: Date;
      endDate?: Date;
      severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
      requiresInvestigation?: boolean;
      limit?: number;
      offset?: number;
    },
  ): Promise<AuditLogEntity[]> {
    let query = this.auditLogRepository.createQueryBuilder('audit');

    if (filters?.userId) {
      query = query.where('audit.userId = :userId', { userId: filters.userId });
    }

    if (filters?.action) {
      query = query.andWhere('audit.action = :action', { action: filters.action });
    }

    if (filters?.startDate) {
      query = query.andWhere('audit.createdAt >= :startDate', { startDate: filters.startDate });
    }

    if (filters?.endDate) {
      query = query.andWhere('audit.createdAt <= :endDate', { endDate: filters.endDate });
    }

    if (filters?.severity) {
      query = query.andWhere('audit.severity = :severity', { severity: filters.severity });
    }

    if (filters?.requiresInvestigation) {
      query = query.andWhere('audit.requiresInvestigation = :requiresInvestigation', {
        requiresInvestigation: true,
      });
    }

    query = query.orderBy('audit.createdAt', 'DESC');

    if (filters?.limit) {
      query = query.take(filters.limit);
    }

    if (filters?.offset) {
      query = query.skip(filters.offset);
    }

    return query.getMany();
  }

  /**
   * Get high-risk audit events
   */
  async getHighRiskEvents(days: number = 7): Promise<AuditLogEntity[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.auditLogRepository
      .createQueryBuilder('audit')
      .where('audit.createdAt >= :startDate', { startDate })
      .andWhere("audit.severity IN (:...severities)", { severities: ['HIGH', 'CRITICAL'] })
      .orderBy('audit.createdAt', 'DESC')
      .getMany();
  }
}
