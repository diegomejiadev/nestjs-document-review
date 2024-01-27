/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewerEntityTypeorm } from './infrastructure/entities/reviewer.entity.typeorm';
import { ReviewerController } from './presentation/controllers/reviewer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewerEntityTypeorm])],
  controllers: [ReviewerController],
  providers: [],
})
export class ReviewerModule {}