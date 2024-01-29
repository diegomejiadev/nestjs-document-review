import { DocumentEntityTypeorm } from 'src/modules/document/infrastructure/entities/document.entity.typeorm';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'applicant',
})
export class ApplicantEntityTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastname: string;

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.applicant)
  sentDocuments: DocumentEntityTypeorm[];

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({
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
