import { Injectable } from '@nestjs/common';
import { CreateReviewerUsecase } from '../../infrastructure/usecases/create-reviewer.usecase';
import { CreateReviewerDto } from '../../domain/dto/create-reviewer.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { ReviewerEntity } from '../../domain/entities/reviewer.entity';

@Injectable()
export class ReviewerService {
  constructor(private readonly createReviewerUsecase: CreateReviewerUsecase) {}

  async createReviewer(
    body: CreateReviewerDto,
  ): Promise<IResponse<ReviewerEntity>> {
    const data = await this.createReviewerUsecase.handle(body);

    return { data };
  }
}
