import { PartialType } from '@nestjs/swagger';
import { CreateDocumentInfoDto } from './create-document-info.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentInfoDto) {}
