/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UploadRepositoryS3 } from './infrastructure/usecases/upload.repository.s3';
import { UploadService } from './presentation/services/upload.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UploadService,
    {
      provide: 'UPLOAD_REPOSITORY',
      useClass: UploadRepositoryS3,
    },
  ],
  exports: [
    {
      provide: 'UPLOAD_REPOSITORY',
      useClass: UploadRepositoryS3,
    },
  ],
})
export class UploadModule {}
