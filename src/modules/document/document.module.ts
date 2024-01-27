/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from './infrastructure/entities/document.entity.typeorm';
import { DocumentController } from './presentation/controllers/document.controller';
import { DocumentService } from './presentation/services/document.service';
import { DocumentDatasourceTypeorm } from './infrastructure/datasources/document.datasource.typeorm';
import { CreateDocumentUsecase } from './infrastructure/usecases/create-document.usecase';
import { UpdateBasicInfoDocumentUsecase } from './infrastructure/usecases/update-basic-info-document.usecase';
import { UpdateFileUrlDocumentUsecase } from './infrastructure/usecases/update-file-url-document.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntityTypeorm])],
  controllers: [DocumentController],
  providers: [
    { provide: 'DOCUMENT_REPOSITORY', useClass: DocumentDatasourceTypeorm },
    DocumentService,
    CreateDocumentUsecase,
    UpdateBasicInfoDocumentUsecase,
    UpdateFileUrlDocumentUsecase,
  ],
})
export class DocumentModule {}
