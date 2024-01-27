import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DOCUMENT_TYPE } from 'src/core/constants/document-type.cst';

export class CreateDocumentDto {
  //   applicantId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  fileUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  title: string;

  @ApiProperty({
    enum: DOCUMENT_TYPE
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(DOCUMENT_TYPE)
  type: DOCUMENT_TYPE;
}
