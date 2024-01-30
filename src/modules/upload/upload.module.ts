/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UploadRepositoryS3 } from './infrastructure/usecases/upload.repository.s3';
import { UploadService } from './presentation/services/upload.service';
import { ConfigService } from '@nestjs/config';
import { StorageProvider } from 'src/core/config/.env.validation';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UploadService,
    {
      provide: 'UPLOAD_REPOSITORY',
      useFactory: (configService: ConfigService) => {
        switch (configService.get('STORAGE_PROVIDER')) {
          case StorageProvider.AWS:
            return new UploadRepositoryS3(configService);

          default:
            return new UploadRepositoryS3(configService);
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    {
      provide: 'UPLOAD_REPOSITORY',
      useFactory: (configService: ConfigService) => {
        return new UploadRepositoryS3(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class UploadModule {}
