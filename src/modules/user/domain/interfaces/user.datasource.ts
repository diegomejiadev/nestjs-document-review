import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateBasicInfoUserDto } from '../dto/update-basic-info-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserDatasource {
  create(body: CreateUserDto): Promise<UserEntity>;
  findById(userId: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  delete(userId: string): Promise<boolean>;
  updateBasic(
    applicantId: string,
    body: UpdateBasicInfoUserDto,
  ): Promise<UserEntity>;
  updateEmail(applicantId: string, email: string): Promise<UserEntity>;
  updatePassword(
    applicantId: string,
    hashedPassword: string,
  ): Promise<UserEntity>;
}
