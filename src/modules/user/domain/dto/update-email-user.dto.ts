import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateEmailUserDto extends PickType(CreateUserDto, [
  'email',
] as const) {}
