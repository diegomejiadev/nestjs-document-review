/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApproverEntityTypeorm } from './infrastructure/entities/approver.entity.typeorm';
import { ApproverController } from './presentation/controllers/approver.controller';
import { ApproverService } from './presentation/services/approver.service';
import { CreateApproverUsecase } from './infrastructure/usecases/create-approver.usecase';
import { FindApproverByIdUsecase } from './infrastructure/usecases/find-approver-by-id.usecase';
import { ApproverDatasourceTypeorm } from './infrastructure/datasources/approver.datasource.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ApproverEntityTypeorm])],
  controllers: [ApproverController],
  providers: [
    {
      provide: 'APPROVER_REPOSITORY',
      useClass: ApproverDatasourceTypeorm,
    },
    ApproverService,
    CreateApproverUsecase,
    FindApproverByIdUsecase,
  ],
  exports: [
    {
      provide: 'APPROVER_REPOSITORY',
      useClass: ApproverDatasourceTypeorm,
    },
  ],
})
export class ApproverModule {}
