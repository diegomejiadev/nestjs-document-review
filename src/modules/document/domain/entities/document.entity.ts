import { DOCUMENT_STATUS } from '../../../../core/constants/document-status.enum';
import { CommentEntity } from 'src/modules/comment/domain/entities/comment.entity';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.enum';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export class DocumentEntity {
  constructor() {}

  private id: string;
  private title: string;
  private fileUrl: string;
  private applicant?: UserEntity;
  private applicantId?: string;
  private reviewerId?: string;
  private reviewer?: UserEntity;
  private approverId?: string;
  private approver?: UserEntity;
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

  public getApplicant(): UserEntity {
    return this.applicant;
  }

  public setApplicant(applicant: UserEntity): this {
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

  public getReviewerId(): string {
    return this.reviewerId;
  }

  public setReviewerId(reviewerId: string): this {
    this.reviewerId = reviewerId;
    return this;
  }

  public getReviewer(): UserEntity {
    return this.reviewer;
  }

  public setReviewer(reviewer: UserEntity): this {
    this.reviewer = reviewer;
    return this;
  }

  public getApproverId(): string {
    return this.approverId;
  }

  public setApproverId(approverId: string): this {
    this.approverId = approverId;
    return this;
  }

  public getApprover(): UserEntity {
    return this.approver;
  }

  public setApprover(approver: UserEntity): this {
    this.approver = approver;
    return this;
  }
}
