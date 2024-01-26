/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApproverEntityTypeorm } from './infrastructure/entities/approver.entity.typeorm';
import { ApproverController } from './presentation/controllers/approver.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApproverEntityTypeorm])],
  controllers: [ApproverController],
  providers: [],
})
export class ApproverModule {}
