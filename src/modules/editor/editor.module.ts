/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorEntityTypeorm } from './infrastructure/entities/editor.entity.typeorm';
import { EditorController } from './presentation/controllers/editor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EditorEntityTypeorm])],
  controllers: [EditorController],
  providers: [],
})
export class EditorModule {}
