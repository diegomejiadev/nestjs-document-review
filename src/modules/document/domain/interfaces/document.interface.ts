import { IApplicant } from 'src/modules/applicant/domain/interfaces/applicant.interface';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';
import { IComment } from 'src/modules/comment/domain/interfaces/comment.interface';

export interface IDocument {
  id: string;
  title: string;
  fileUrl: string;
  type: DOCUMENT_TYPE;
  // applicantId: string;
  // applicant?: IApplicant;
  status: DOCUMENT_STATUS;
  // comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}
