import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IApplicant } from '../interfaces/applicant.interface';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class ApplicantEntity implements IApplicant {
  id: string;
  name: string;
  lastname: string;
  sentDocuments: DocumentEntity[];
  createdAt: Date;
  updatedAt: Date;
}
