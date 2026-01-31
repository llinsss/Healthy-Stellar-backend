import { IsString, IsEnum, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { PrecautionType } from '../entities/isolation-precaution.entity';

export class CreateIsolationPrecautionDto {
  @IsString()
  patientId: string;

  @IsEnum(PrecautionType)
  precautionType: PrecautionType;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  reason?: string;
}
