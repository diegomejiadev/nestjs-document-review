/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from './infrastructure/entities/document.entity.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntityTypeorm])],
  controllers: [],
  providers: [],
})
export class DocumentModule {}
