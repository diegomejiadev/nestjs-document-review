import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IApprover } from '../interfaces/approver.interface';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class ApproverEntity implements IApprover {
  id: string;
  name: string;
  lastname: string;
  approvedDocuments: DocumentEntity[];
  rejectedDocuments: DocumentEntity[];
  createdAt: Date;
  updatedAt: Date;
}
