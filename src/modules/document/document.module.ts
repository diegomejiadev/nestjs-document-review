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
import { FindDocumentByIdUsecase } from './infrastructure/usecases/find-document-by-id.usecase';
import { AssignReviewerUsecase } from './infrastructure/usecases/assign-reviewer.usecase';
import { ReviewerModule } from '../reviewer/reviewer.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntityTypeorm]), ReviewerModule],
  controllers: [DocumentController],
  providers: [
    { provide: 'DOCUMENT_REPOSITORY', useClass: DocumentDatasourceTypeorm },

    DocumentService,
    CreateDocumentUsecase,
    UpdateBasicInfoDocumentUsecase,
    UpdateFileUrlDocumentUsecase,
    FindDocumentByIdUsecase,
    AssignReviewerUsecase,
  ],
})
export class DocumentModule {}
