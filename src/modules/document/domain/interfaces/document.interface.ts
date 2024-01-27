import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';

export interface IDocument {
  id: string;
  title: string;
  fileUrl: string;
  type: DOCUMENT_TYPE;
  // applicantId: string;
  // applicant?: IApplicant;
  status: DOCUMENT_STATUS;
  submissionDate: Date;
  // comments?: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
