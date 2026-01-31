import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { ResistanceLevel } from '../entities/antibiotic-resistance.entity';

export class CreateAntibioticResistanceDto {
  @IsString()
  patientId: string;

  @IsString()
  pathogen: string;

  @IsString()
  antibiotic: string;

  @IsEnum(ResistanceLevel)
  resistanceLevel: ResistanceLevel;

  @IsDateString()
  detectedAt: string;

  @IsString()
  @IsOptional()
  location?: string;
}
