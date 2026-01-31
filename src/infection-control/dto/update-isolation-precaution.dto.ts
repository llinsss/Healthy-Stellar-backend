import { PartialType } from '@nestjs/mapped-types';
import { CreateIsolationPrecautionDto } from './create-isolation-precaution.dto';

export class UpdateIsolationPrecautionDto extends PartialType(CreateIsolationPrecautionDto) {}
