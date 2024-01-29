import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBasicInfoUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;
}
