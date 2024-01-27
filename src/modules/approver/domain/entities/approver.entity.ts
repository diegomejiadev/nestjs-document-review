import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class ApproverEntity {
  id: string;
  name: string;
  lastname: string;
  approvedDocuments: DocumentEntity[];
  rejectedDocuments: DocumentEntity[];
  createdAt: Date;
  updatedAt: Date;
}
