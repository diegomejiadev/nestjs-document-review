import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDocumentInfoDto } from '../../domain/dto/create-document-info.dto';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { DOCUMENT_STATUS } from 'src/core/constants/document-status.cst';

@Injectable()
export class SendDocumentCheckUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
  ) {}

  async handle(
    documentId: string,
    body: CreateDocumentInfoDto,
  ): Promise<DocumentEntity> {
    try {
      const APPLICANT_ID = '94151601-f35b-4405-91cd-7ca9a738a399';

      //* 1. Verificamos que exista el documento
      const foundDocument = await this.repository.findById(documentId);

      //* 2. Si no existe mandamos error
      if (!foundDocument) {
        throw new NotFoundException('No se encontró el documento a revisar');
      }

      //* 3. Verificamos que se encuentre en el estado 'uploaded'
      if (foundDocument.getStatus() !== DOCUMENT_STATUS.JUST_UPLOADED) {
        throw new BadRequestException(
          'Solo puede mandar a verificar un documento si este se encuentra recien subido',
        );
      }

      //* 4. Creamos el documento en la base de datos
      const createdDocument = await this.repository.updateBasicInfo(
        APPLICANT_ID,
        body,
      );

      //* 5. Devolvemos el DocumentEntity
      return createdDocument;
    } catch (e) {
      //* Eliminamos el archivo subido
      //TODO Ver como eliminar el archivo subido
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
