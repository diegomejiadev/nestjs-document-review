/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewerEntityTypeorm } from './infrastructure/entities/reviewer.entity.typeorm';
import { ReviewerService } from './presentation/services/reviewer.service';
import { CreateReviewerUsecase } from './infrastructure/usecases/create-reviewer.usecase';
import { ReviewerDatasourceTypeorm } from './infrastructure/datasources/reviewer.datasource.typeorm';
import { ReviewerController } from './presentation/controllers/reviewer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewerEntityTypeorm])],
  controllers: [ReviewerController],
  providers: [
    {
      provide: 'REVIEWER_REPOSITORY',
      useClass: ReviewerDatasourceTypeorm,
    },
    ReviewerService,
    CreateReviewerUsecase,
  ],
})
export class ReviewerModule {}
