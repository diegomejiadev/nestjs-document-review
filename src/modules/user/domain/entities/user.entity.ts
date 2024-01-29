import { Exclude } from 'class-transformer';

export class UserEntity {
  private id: string;
  private name: string;
  private lastname: string;
  private email: string;

  @Exclude()
  private password: string;
  private role: string;
  private updatedAt: Date;
  private createdAt: Date;

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

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): this {
    this.password = password;
    return this;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string): this {
    this.role = role;
    return this;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): this {
    this.updatedAt = updatedAt;
    return this;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): this {
    this.createdAt = createdAt;
    return this;
  }
}
