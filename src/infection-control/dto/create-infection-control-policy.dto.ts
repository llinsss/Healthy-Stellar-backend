import { IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreateInfectionControlPolicyDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsDateString()
  effectiveDate: string;

  @IsString()
  version: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
