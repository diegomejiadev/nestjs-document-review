/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntityTypeorm } from './infrastructure/entities/applicant.entity.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntityTypeorm])],
  controllers: [],
  providers: [],
})
export class ApplicantModule {}
