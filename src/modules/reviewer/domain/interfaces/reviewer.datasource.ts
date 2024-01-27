import { CreateReviewerDto } from '../dto/create-reviewer.dto';
import { UpdateReviewerBasicInfoDto } from '../dto/update-reviewer-basic-info.dto';
import { ReviewerEntity } from '../entities/reviewer.entity';

export interface IReviewerDatasource {
  findById(reviewerId): Promise<ReviewerEntity>;
  create(body: CreateReviewerDto): Promise<ReviewerEntity | null>;
  updateBasicInfo(
    reviewerId: string,
    body: UpdateReviewerBasicInfoDto,
  ): Promise<ReviewerEntity>;
  updateEmail(reviewerId: string, email: string): Promise<ReviewerEntity>;
  updatePassword(
    reviewerId: string,
    hashedPassword: string,
  ): Promise<ReviewerEntity>;
  delete(reviewerId: string): Promise<boolean>;
  findByEmail(email: string): Promise<ReviewerEntity | null>;
}
