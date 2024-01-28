import { Injectable } from '@nestjs/common';
import { CreateDocumentUsecase } from '../../infrastructure/usecases/create-document.usecase';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';
import { UpdateBasicInfoDocumentUsecase } from '../../infrastructure/usecases/update-basic-info-document.usecase';
import { UpdateFileUrlDocumentUsecase } from '../../infrastructure/usecases/update-file-url-document.usecase';
import { FindDocumentByIdUsecase } from '../../infrastructure/usecases/find-document-by-id.usecase';
import { AssignReviewerUsecase } from '../../infrastructure/usecases/assign-reviewer.usecase';
import { ApproveDocumentDto } from '../../domain/dto/approve-document.dto';
import { ProceedReviewUsecase } from '../../infrastructure/usecases/proceed-review.usecase';
import { ApproveDocumentUsecase } from '../../infrastructure/usecases/approve-document.usecase';

@Injectable()
export class DocumentService {
  constructor(
    private readonly createDocumentUsecase: CreateDocumentUsecase,
    private readonly updateBasicInfoDocumentUsecase: UpdateBasicInfoDocumentUsecase,
    private readonly updateFileUrlDocumentUsecase: UpdateFileUrlDocumentUsecase,
    private readonly findDocumentByIdUsecase: FindDocumentByIdUsecase,
    private readonly assignReviewerUsecase: AssignReviewerUsecase,
    private readonly proceedReviewUsecase: ProceedReviewUsecase,
    private readonly approveDocumentUsecase: ApproveDocumentUsecase,
  ) {}

  async findById(documentId: string): Promise<IResponse<DocumentEntity>> {
    const data = await this.findDocumentByIdUsecase.handle(documentId);

    return { data };
  }

  async create(body: CreateDocumentDto): Promise<IResponse<DocumentEntity>> {
    const data = await this.createDocumentUsecase.handle(body);

    return { data };
  }

  async updateBasicInfo(
    documentId: string,
    body: UpdateDocumentDto,
  ): Promise<IResponse<DocumentEntity>> {
    const data = await this.updateBasicInfoDocumentUsecase.handle(
      documentId,
      body,
    );

    return { data };
  }

  async updateFileUrl(documentId: string): Promise<IResponse<DocumentEntity>> {
    const data = await this.updateFileUrlDocumentUsecase.handle(documentId);

    return { data };
  }

  async assignReviewer(documentId: string): Promise<IResponse<DocumentEntity>> {
    const REVIEWER_ID = 'b48e9e66-e02f-42f8-8393-c3abeb5397ac';

    const data = await this.assignReviewerUsecase.handle(
      documentId,
      REVIEWER_ID,
    );

    return { data };
  }

  async proceedReview(
    documentId: string,
    body: ApproveDocumentDto,
  ): Promise<IResponse<DocumentEntity>> {
    const data = await this.proceedReviewUsecase.handle(documentId, body);

    return { data };
  }

  async approveDocument(
    documentId: string,
    body: ApproveDocumentDto,
  ): Promise<IResponse<DocumentEntity>> {
    const data = await this.approveDocumentUsecase.handle(documentId, body);

    return { data };
  }
}
