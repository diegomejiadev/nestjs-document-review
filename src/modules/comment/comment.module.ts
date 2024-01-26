/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntityTypeorm } from './infrastructure/entities/comment.entity.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntityTypeorm])],
  controllers: [],
  providers: [],
})
export class CommentModule {}
