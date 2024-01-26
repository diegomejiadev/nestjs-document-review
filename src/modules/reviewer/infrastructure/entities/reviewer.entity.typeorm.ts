import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IReviewer } from '../../domain/interfaces/reviewer.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  // reviewedDocuments: IDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
