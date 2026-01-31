import { IsString, IsEnum, IsDateString, IsOptional, IsInt } from 'class-validator';
import { OutbreakStatus } from '../entities/outbreak-incident.entity';

export class CreateOutbreakIncidentDto {
  @IsString()
  location: string;

  @IsString()
  pathogen: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsEnum(OutbreakStatus)
  @IsOptional()
  status?: OutbreakStatus;

  @IsInt()
  @IsOptional()
  affectedCount?: number;

  @IsString()
  @IsOptional()
  investigationNotes?: string;
}
