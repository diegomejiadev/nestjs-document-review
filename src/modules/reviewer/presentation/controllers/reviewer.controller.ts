import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateReviewerDto } from '../../domain/dto/create-reviewer.dto';
import { ReviewerService } from '../services/reviewer.service';

@ApiBearerAuth()
@ApiTags('Reseñador - Reviewer')
@Controller('reviewer')
export class ReviewerController {
  constructor(private readonly reviewerService: ReviewerService) {}

  @Post()
  create(@Body() body: CreateReviewerDto) {
    return this.reviewerService.createReviewer(body);
  }
}
