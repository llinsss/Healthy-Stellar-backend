import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { InfectionStatus } from '../entities/infection-case.entity';

export class CreateInfectionCaseDto {
  @IsString()
  patientId: string;

  @IsString()
  infectionType: string;

  @IsString()
  pathogen: string;

  @IsDateString()
  detectionDate: string;

  @IsEnum(InfectionStatus)
  @IsOptional()
  status?: InfectionStatus;

  @IsString()
  @IsOptional()
  location?: string;
}
