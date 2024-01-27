import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class EditorEntity {
  id: string;
  name: string;
  lastname: string;
  editingDocuments: DocumentEntity[];
  createdAt: Date;
  updatedAt: Date;
}
