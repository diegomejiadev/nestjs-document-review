import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { ApproveDocumentDto } from '../../domain/dto/approve-document.dto';

@Injectable()
export class ProceedReviewUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
  ) {}

  async handle(documentId: string, body: ApproveDocumentDto): Promise<DocumentEntity> {
    try {
      //* 1. Verificamos si el documento existe
      const foundDocument = await this.repository.findById(documentId);

      if (!foundDocument) {
        throw new NotFoundException('No se encontró el documento a actualizar');
      }

      //* 2. Aprobamos la reseña del documento
      const updatedDocument =
        await this.repository.reviewingProceeeding(documentId);

      //* 3. Creamos el comentario insertado en body
      //TODO Crear la logica con los comentarios

      //* 4. Retornamos el DocumentEntity
      return updatedDocument;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
