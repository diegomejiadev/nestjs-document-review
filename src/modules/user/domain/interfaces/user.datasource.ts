import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateBasicInfoUserDto } from '../dto/update-basic-info-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserDatasource {
  create(body: CreateUserDto): Promise<UserEntity>;
  findById(userId: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  delete(userId: string): Promise<boolean>;
  updateBasic(
    userId: string,
    body: UpdateBasicInfoUserDto,
  ): Promise<UserEntity>;
  updateEmail(userId: string, email: string): Promise<UserEntity>;
  updatePassword(userId: string, hashedPassword: string): Promise<UserEntity>;
}
