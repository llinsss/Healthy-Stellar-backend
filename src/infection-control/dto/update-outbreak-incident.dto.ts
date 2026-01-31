import { PartialType } from '@nestjs/mapped-types';
import { CreateOutbreakIncidentDto } from './create-outbreak-incident.dto';

export class UpdateOutbreakIncidentDto extends PartialType(CreateOutbreakIncidentDto) {}
