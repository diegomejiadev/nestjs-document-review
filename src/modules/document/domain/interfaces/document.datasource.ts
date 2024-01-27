import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { DocumentEntity } from '../entities/document.entity';

export interface IDocumentDatasource {
  create(
    applicantId: string,
    fileUrl: string,
    body: CreateDocumentDto,
  ): Promise<DocumentEntity>;

  updateBasicInfo(
    documentId: string,
    body: UpdateDocumentDto,
  ): Promise<DocumentEntity>;

  updateFileUrl(
    documentId: string,
    newFileUrl: string,
  ): Promise<DocumentEntity>;

  updateStatus(
    documentId: string,
    status: DOCUMENT_STATUS,
  ): Promise<DocumentEntity>;

  assignReviewer(
    documentId: string,
    reviewerId: string,
  ): Promise<DocumentEntity>;

  assignApprover(
    documentId: string,
    approverId: string,
  ): Promise<DocumentEntity>;

  delete(documentId: string): Promise<boolean>;
}
