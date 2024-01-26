import { DocumentEntityTypeorm } from 'src/modules/document/infrastructure/entities/document.entity.typeorm';
import { IEditor } from '../../domain/interfaces/editor.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.editor)
  editingDocuments: DocumentEntityTypeorm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
