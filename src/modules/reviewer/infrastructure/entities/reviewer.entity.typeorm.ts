import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IReviewer } from '../../domain/interfaces/reviewer.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DocumentEntityTypeorm } from 'src/modules/document/infrastructure/entities/document.entity.typeorm';
import { CommentEntityTypeorm } from 'src/modules/comment/infrastructure/entities/comment.entity.typeorm';

@Entity({
  name: 'reviewer',
})
export class ReviewerEntityTypeorm implements IReviewer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @OneToMany(() => CommentEntityTypeorm, (comment) => comment.reviewer)
  comments: CommentEntityTypeorm[];

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.reviewer)
  assignedDocuments: DocumentEntityTypeorm[];

  @CreateDateColumn( {
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
