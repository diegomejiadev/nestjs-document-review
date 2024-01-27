/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntityTypeorm } from './infrastructure/entities/applicant.entity.typeorm';
import { ApplicantController } from './presentation/controllers/applicant.controller';
import { ApplicantService } from './presentation/services/applicant.service';
import { CreateApplicantUsecase } from './infrastructure/usecases/create-applicant.usecase';
import { ApplicantDatasourceTypeorm } from './infrastructure/datasources/applicant.datasource.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntityTypeorm])],
  controllers: [ApplicantController],
  providers: [
    ApplicantService,
    CreateApplicantUsecase,
    {
      provide: 'APPLICANT_REPOSITORY',
      useClass: ApplicantDatasourceTypeorm,
    },
  ],
})
export class ApplicantModule {}
