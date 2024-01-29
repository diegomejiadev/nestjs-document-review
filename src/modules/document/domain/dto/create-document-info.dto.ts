import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.enum';

export class CreateDocumentInfoDto {
  //   applicantId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  title: string;

  @ApiProperty({
    enum: DOCUMENT_TYPE,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(DOCUMENT_TYPE)
  type: DOCUMENT_TYPE;
}
