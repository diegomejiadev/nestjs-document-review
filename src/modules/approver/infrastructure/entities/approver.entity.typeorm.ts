import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IApprover } from '../../domain/interfaces/approver.interface';
import { DocumentEntityTypeorm } from 'src/modules/document/infrastructure/entities/document.entity.typeorm';

@Entity({ name: 'approver' })
export class ApproverEntityTypeorm implements IApprover {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @OneToMany(
    () => DocumentEntityTypeorm,
    (document) => document.approverAssigned,
  )
  assignedDocuments: DocumentEntityTypeorm[];

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
