import { PickType } from '@nestjs/swagger';
import { CreateApplicantDto } from './create-applicant.dto';

export class UpdateEmailApplicantDto extends PickType(CreateApplicantDto, [
  'email',
] as const) {}
