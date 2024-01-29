/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityTypeorm } from './infrastructure/entities/user.entity.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntityTypeorm])],
  controllers: [],
  providers: [],
})
export class UserModule {}
