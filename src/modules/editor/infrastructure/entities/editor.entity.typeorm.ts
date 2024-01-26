import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IEditor } from '../../domain/interfaces/editor.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'editor',
})
export class EditorEntityTypeorm implements IEditor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;
  // editingDocuments: IDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
