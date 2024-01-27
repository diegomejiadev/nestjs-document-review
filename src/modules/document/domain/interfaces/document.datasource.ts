import { CreateDocumentDto } from '../dto/create-document.dto';
import { DocumentEntity } from '../entities/document.entity';

export interface IDocumentDatasource {
  create(applicantId: string, body: CreateDocumentDto): Promise<DocumentEntity>;
}
