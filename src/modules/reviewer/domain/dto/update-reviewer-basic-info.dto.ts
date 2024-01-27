import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateReviewerDto } from './create-reviewer.dto';

export class UpdateReviewerBasicInfoDto extends PartialType(
  OmitType(CreateReviewerDto, ['email', 'password'] as const),
) {}
