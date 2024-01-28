import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { ApproveDocumentDto } from '../../domain/dto/approve-document.dto';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';

@Injectable()
export class ApproveDocumentUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
  ) {}

  async handle(
    documentId: string,
    body: ApproveDocumentDto,
  ): Promise<DocumentEntity> {
    try {
      //* 1. Verificamos si el documento existe
      const foundDocument = await this.repository.findById(documentId);

      if (!foundDocument) {
        throw new NotFoundException('No se encontró el documento a actualizar');
      }

      //* 2. Debe validar que este en el estado APPROVER_ASSIGNED
      if (
        ![DOCUMENT_STATUS.APPROVER_ASSIGNED].includes(foundDocument.getStatus())
      ) {
        throw new NotAcceptableException(
          'Solo puede aprobar la reseña de documentos que se encuentren en el estado ASIGNADO A APROBADOR',
        );
      }

      //* 3. Aprobamos la reseña del documento
      const updatedDocument = await this.repository.approveDocument(documentId);

      //* 4. Creamos el comentario insertado en body
      //TODO Crear la logica con los comentarios

      //* 5. Retornamos el DocumentEntity
      return updatedDocument;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
