/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApproverEntityTypeorm } from './infrastructure/entities/approver.entity.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ApproverEntityTypeorm])],
  controllers: [],
  providers: [],
})
export class ApproverModule {}
