import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDocumentUsecase } from '../../infrastructure/usecases/create-document.usecase';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { IResponse } from 'src/core/interfaces/response.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';
import { UpdateBasicInfoDocumentUsecase } from '../../infrastructure/usecases/update-basic-info-document.usecase';
import { UpdateFileUrlDocumentUsecase } from '../../infrastructure/usecases/update-file-url-document.usecase';

@Injectable()
export class DocumentService {
  constructor(
    private readonly createDocumentUsecase: CreateDocumentUsecase,
    private readonly updateBasicInfoDocumentUsecase: UpdateBasicInfoDocumentUsecase,
    private readonly updateFileUrlDocumentUsecase: UpdateFileUrlDocumentUsecase,
  ) {}

  async create(body: CreateDocumentDto): Promise<IResponse<DocumentEntity>> {
    const data = await this.createDocumentUsecase.handle(body);

    return { data };
  }

  async updateBasicInfo(
    documentId: string,
    body: UpdateDocumentDto,
  ): Promise<IResponse<DocumentEntity>> {
    const data = await this.updateBasicInfoDocumentUsecase.handle(
      documentId,
      body,
    );

    return { data };
  }

  async updateFileUrl(documentId: string): Promise<IResponse<DocumentEntity>> {
    const data = await this.updateFileUrlDocumentUsecase.handle(documentId);

    return { data };
  }
}
