import { IsString, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class CreateHandHygieneAuditDto {
  @IsString()
  staffId: string;

  @IsString()
  location: string;

  @IsBoolean()
  compliant: boolean;

  @IsDateString()
  auditDate: string;

  @IsString()
  @IsOptional()
  observations?: string;
}
