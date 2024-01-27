import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReviewerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
