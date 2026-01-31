import { PartialType } from '@nestjs/mapped-types';
import { CreateInfectionControlPolicyDto } from './create-infection-control-policy.dto';

export class UpdateInfectionControlPolicyDto extends PartialType(CreateInfectionControlPolicyDto) {}
