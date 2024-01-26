/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorEntityTypeorm } from './infrastructure/entities/editor.entity.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EditorEntityTypeorm])],
  controllers: [],
  providers: [],
})
export class EditorModule {}
