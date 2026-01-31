import { PartialType } from '@nestjs/mapped-types';
import { CreateInfectionCaseDto } from './create-infection-case.dto';

export class UpdateInfectionCaseDto extends PartialType(CreateInfectionCaseDto) {}
