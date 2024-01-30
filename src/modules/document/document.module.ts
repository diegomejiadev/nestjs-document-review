/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntityTypeorm } from './infrastructure/entities/document.entity.typeorm';
import { DocumentController } from './presentation/controllers/document.controller';
import { DocumentService } from './presentation/services/document.service';
import { DocumentDatasourceTypeorm } from './infrastructure/datasources/document.datasource.typeorm';
import { SendDocumentCheckUsecase } from './infrastructure/usecases/send-document-to-check.usecase';
import { UpdateBasicInfoDocumentUsecase } from './infrastructure/usecases/update-basic-info-document.usecase';
import { UpdateFileUrlDocumentUsecase } from './infrastructure/usecases/update-file-url-document.usecase';
import { FindDocumentByIdUsecase } from './infrastructure/usecases/find-document-by-id.usecase';
import { AssignReviewerUsecase } from './infrastructure/usecases/assign-reviewer.usecase';
import { ProceedReviewUsecase } from './infrastructure/usecases/proceed-review.usecase';
import { ApproveDocumentUsecase } from './infrastructure/usecases/approve-document.usecase';
import { AssignApproverUsecase } from './infrastructure/usecases/assign-approver.usecase';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntityTypeorm]), UserModule],
  controllers: [DocumentController],
  providers: [
    { provide: 'DOCUMENT_REPOSITORY', useClass: DocumentDatasourceTypeorm },

    DocumentService,
    SendDocumentCheckUsecase,
    UpdateBasicInfoDocumentUsecase,
    UpdateFileUrlDocumentUsecase,
    FindDocumentByIdUsecase,
    AssignReviewerUsecase,
    ProceedReviewUsecase,
    ApproveDocumentUsecase,
    AssignApproverUsecase,
  ],
})
export class DocumentModule {}
