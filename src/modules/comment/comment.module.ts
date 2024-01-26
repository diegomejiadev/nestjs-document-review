/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntityTypeorm } from './infrastructure/entities/comment.entity.typeorm';
import { CommentController } from './presentation/controllers/comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntityTypeorm])],
  controllers: [CommentController],
  providers: [],
})
export class CommentModule {}
