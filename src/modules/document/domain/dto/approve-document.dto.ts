import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
