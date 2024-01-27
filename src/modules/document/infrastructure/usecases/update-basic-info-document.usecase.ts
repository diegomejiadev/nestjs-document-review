import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { UpdateDocumentDto } from '../../domain/dto/update-document.dto';

@Injectable()
export class UpdateBasicInfoDocumentUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
  ) {}

  async handle(
    documentId: string,
    body: UpdateDocumentDto,
  ): Promise<DocumentEntity> {
    try {
      //* 1. Verificamos que existe el documento
      const foundDocument = await this.repository.findById(documentId);

      if (!foundDocument) {
        throw new NotFoundException('No se encontró el documento a editar');
      }

      //* 2. Actualizamos la información del documento
      const updatedDocument = await this.repository.updateBasicInfo(
        documentId,
        body,
      );

      //* 3. Retornamos el documento
      return updatedDocument;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
