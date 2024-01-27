import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';

@Injectable()
export class UpdateFileUrlDocumentUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY') private repository: IDocumentDatasource,
  ) {}

  async handle(documentId: string): Promise<DocumentEntity> {
    const UPDATED_FILE_URL =
      'https://storage.googleapis.com/test-projects-hedgehog/sample-2.pdf';

    try {
      //* 1. Subimos el archivo y obtenemos el URL
      //TODO Implementar la subida del nuevo archivo

      //* 2. Actualizamos el enlace del documento con el nuevo brindado
      const updatedDocument = await this.repository.updateFileUrl(
        documentId,
        UPDATED_FILE_URL,
      );

      //* 3. Retornamos el documento actualizado
      return updatedDocument;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
