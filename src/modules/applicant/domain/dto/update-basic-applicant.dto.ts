import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateApplicantDto } from './create-applicant.dto';

export class UpdateBasicInfoApplicantDto extends PartialType(
  OmitType(CreateApplicantDto, ['email', 'password'] as const),
) {}
