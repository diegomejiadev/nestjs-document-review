import { IDocument } from 'src/modules/document/domain/interfaces/document.interface';
import { IApplicant } from '../../domain/interfaces/applicant.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'applicant',
})
export class ApplicantEntityTypeorm implements IApplicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  // sentDocuments: IDocument[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
