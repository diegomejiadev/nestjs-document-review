import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IEditor } from '../interfaces/editor.interface';
import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class EditorEntity implements IEditor {
  id: string;
  name: string;
  lastname: string;
  editingDocuments: DocumentEntity[];
  createdAt: Date;
  updatedAt: Date;
}
