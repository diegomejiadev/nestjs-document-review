/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntityTypeorm } from './infrastructure/entities/applicant.entity.typeorm';
import { ApplicantController } from './presentation/controllers/applicant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntityTypeorm])],
  controllers: [ApplicantController],
  providers: [],
})
export class ApplicantModule {}
