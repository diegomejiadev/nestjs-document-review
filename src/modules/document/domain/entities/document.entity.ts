import { ApplicantEntity } from 'src/modules/applicant/domain/entities/applicant.entity';
import { DOCUMENT_STATUS } from '../../../../core/constants/document-status.cst';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';
import { CommentEntity } from 'src/modules/comment/domain/entities/comment.entity';

export class DocumentEntity {
  constructor() {}

  private id: string;
  private title: string;
  private fileUrl: string;
  private applicant?: ApplicantEntity;
  private applicantId?: string;
  private type: DOCUMENT_TYPE;
  private submissionDate: Date;
  private status: DOCUMENT_STATUS;
  private comments?: CommentEntity[];
  private createdAt?: Date;
  private updatedAt?: Date;
  private deletedAt?: Date;

  public getId(): string {
    return this.id;
  }

  public setId(id: string): this {
    this.id = id;
    return this;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public getFileUrl(): string {
    return this.fileUrl;
  }

  public setFileUrl(fileUrl: string): this {
    this.fileUrl = fileUrl;
    return this;
  }

  public getApplicant(): ApplicantEntity {
    return this.applicant;
  }

  public setApplicant(applicant: ApplicantEntity): this {
    this.applicant = applicant;
    return this;
  }

  public getApplicantId(): string {
    return this.applicantId;
  }

  public setApplicantId(applicantId: string): this {
    this.applicantId = applicantId;
    return this;
  }

  public getType(): DOCUMENT_TYPE {
    return this.type;
  }

  public setType(type: DOCUMENT_TYPE): this {
    this.type = type;
    return this;
  }

  public getSubmissionDate(): Date {
    return this.submissionDate;
  }

  public setSubmissionDate(submissionDate: Date): this {
    this.submissionDate = submissionDate;
    return this;
  }

  public getStatus(): DOCUMENT_STATUS {
    return this.status;
  }

  public setStatus(status: DOCUMENT_STATUS): this {
    this.status = status;
    return this;
  }

  public getComments(): CommentEntity[] {
    return this.comments;
  }

  public setComments(comments: CommentEntity[]): this {
    this.comments = comments;
    return this;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): this {
    this.createdAt = createdAt;
    return this;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): this {
    this.updatedAt = updatedAt;
    return this;
  }

  public getDeletedAt(): Date {
    return this.deletedAt;
  }

  public setDeletedAt(deletedAt: Date): this {
    this.deletedAt = deletedAt;
    return this;
  }

  public build(): this {
    return this;
  }
}
