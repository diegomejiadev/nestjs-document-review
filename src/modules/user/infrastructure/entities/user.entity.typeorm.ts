import { ROLE } from 'src/core/constants/role.enum';
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

@Entity({ name: 'user' })
export class UserEntityTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.applicant)
  uploadedDocuments: DocumentEntityTypeorm[];

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.applicant)
  reviewingDocuments: DocumentEntityTypeorm[];

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.applicant)
  editingDocuments: DocumentEntityTypeorm[];

  @OneToMany(() => DocumentEntityTypeorm, (document) => document.applicant)
  approvingDocuments: DocumentEntityTypeorm[];

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ROLE,
  })
  role: ROLE;

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
