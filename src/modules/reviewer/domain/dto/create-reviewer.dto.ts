import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReviewerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
