import { PartialType } from '@nestjs/swagger';
import { CreateDocumentInfoDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentInfoDto) {}
