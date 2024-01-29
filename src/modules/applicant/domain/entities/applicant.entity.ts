import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { Exclude } from 'class-transformer';

export class ApplicantEntity {
  constructor() {}

  private id: string;
  private name: string;
  private lastname: string;
  private email: string;

  @Exclude()
  private password: string;

  private sentDocuments?: DocumentEntity[];
  private createdAt?: Date;
  private updatedAt?: Date;
  private deletedAt?: Date;

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): this {
    this.password = password;
    return this;
  }

  public getSentDocuments(): DocumentEntity[] {
    return this.sentDocuments;
  }

  public setSentDocuments(sentDocuments: DocumentEntity[]): this {
    this.sentDocuments = sentDocuments;
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

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): this {
    this.email = email;
    return this;
  }
}
