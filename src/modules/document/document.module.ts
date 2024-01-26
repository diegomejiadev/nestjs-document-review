/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from './infrastructure/entities/document.entity.typeorm';
import { DocumentController } from './presentation/controllers/document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntityTypeorm])],
  controllers: [DocumentController],
  providers: [],
})
export class DocumentModule {}
