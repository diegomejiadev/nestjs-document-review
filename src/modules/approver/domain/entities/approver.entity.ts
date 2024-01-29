import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';

export class ApproverEntity {
  private id: string;
  private name: string;
  private lastname: string;
  private assignedDocuments: DocumentEntity[];
  private comments: Comment[];
  private createdAt: Date;
  private updatedAt: Date;

  public getId(): string {
    return this.id;
  }

  public setId(id: string): this {
    this.id = id;
    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public setLastname(lastname: string): this {
    this.lastname = lastname;
    return this;
  }

  public getAssignedDocuments(): DocumentEntity[] {
    return this.assignedDocuments;
  }

  public setAssignedDocuments(assignedDocuments: DocumentEntity[]): this {
    this.assignedDocuments = assignedDocuments;
    return this;
  }

  public getComments(): Comment[] {
    return this.comments;
  }

  public setComments(comments: Comment[]): this {
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
}
