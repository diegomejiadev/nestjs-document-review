import { CreateApproverDto } from '../dto/create-approver.dto';
import { ApproverEntity } from '../entities/approver.entity';

export interface IApproverDatasource {
  create(body: CreateApproverDto): Promise<ApproverEntity>;
  findById(approvedId: string): Promise<ApproverEntity | null>;
  findByEmail(email: string): Promise<ApproverEntity | null>;
}
