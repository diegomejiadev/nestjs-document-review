import { IUser } from '../interfaces/user.interface';

export class UserEntity implements IUser {
  id: string;
  name: string;
  lastname: string;
  role: string;
  updatedAt: Date;
  createdAt: Date;
}
