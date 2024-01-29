import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  developmentDatabaseConfig,
  productionDatabaseConfig,
  testDatabaseConfig,
} from './database.config';
import { IDatabaseConfig } from './database.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          type: 'postgres',
          autoLoadEntities: true,
          logging: configService.get('NODE_ENV') !== 'production',
          synchronize: configService.get('NODE_ENV') !== 'production',
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
