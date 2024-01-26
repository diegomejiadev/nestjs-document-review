/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewerEntityTypeorm } from './infrastructure/entities/reviewer.entity.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewerEntityTypeorm])],
  controllers: [],
  providers: [],
})
export class ReviewerModule {}
