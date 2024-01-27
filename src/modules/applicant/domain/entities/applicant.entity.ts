import { DocumentEntity } from 'src/modules/document/domain/entities/document.entity';
import { Exclude } from 'class-transformer';

export class ApplicantEntity {
  id: string;
  name: string;
  lastname: string;
  email: string;

  @Exclude()
  password: string;

  sentDocuments?: DocumentEntity[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getSentDocuments(): DocumentEntity[] {
    return this.sentDocuments;
  }

  public setSentDocuments(sentDocuments: DocumentEntity[]): void {
    this.sentDocuments = sentDocuments;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public getDeletedAt(): Date {
    return this.deletedAt;
  }

  public setDeletedAt(deletedAt: Date): void {
    this.deletedAt = deletedAt;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public setLastname(lastname: string): void {
    this.lastname = lastname;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }
}
