import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentEntity } from '../entities/document.entity';

export interface IDocumentDatasource {
  create(
    applicantId: string,
    fileUrl: string,
    body: CreateDocumentDto,
  ): Promise<DocumentEntity>;
}
