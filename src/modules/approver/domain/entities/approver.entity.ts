import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class ApproverEntity {
  id: string;
  name: string;
  lastname: string;
  approvedDocuments: DocumentEntity[];
  rejectedDocuments: DocumentEntity[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
