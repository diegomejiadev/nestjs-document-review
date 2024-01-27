import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';

export class CreateDocumentDto {
//   applicantId: string;
  fileUrl: string;
  title: string;
  type: DOCUMENT_TYPE;
}
