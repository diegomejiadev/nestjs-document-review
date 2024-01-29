/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityTypeorm } from './infrastructure/entities/user.entity.typeorm';
import { UserDatasourceTypeorm } from './infrastructure/datasources/user.datasource.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntityTypeorm])],
  controllers: [],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserDatasourceTypeorm,
    },
  ],
  exports: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserDatasourceTypeorm,
    },
  ],
})
export class UserModule {}
