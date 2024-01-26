import { DocumentEntityTypeorm } from 'src/modules/document/infrastructure/entities/document.entity.typeorm';
import { IApplicant } from '../../domain/interfaces/applicant.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.applicant)
  sentDocuments: DocumentEntityTypeorm[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
