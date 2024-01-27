import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDocumentDto } from '../../domain/dto/create-document.dto';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';

@Injectable()
export class CreateDocumentUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
  ) {}

  async handle(body: CreateDocumentDto): Promise<DocumentEntity> {
    try {
      //* 1. Extraemos el ID del Aplicante
      //TODO Extraer el ApplicantID del JWT
      const APPLICANT_ID = 'c11113b3-3cea-4aea-9ac1-67fb32e26c14';

      //* 2. Subimos el archivo y obtenemos el URL
      //TODO Implementar metodo de subida de archivo
      const FILE_PDF =
        'https://storage.googleapis.com/test-projects-hedgehog/sample.pdf';

      //* 3. Creamos el documento en la base de datos
      let createdDocument: DocumentEntity;

      try {
        createdDocument = await this.repository.create(APPLICANT_ID, body);
      } catch (e) {
        throw new BadRequestException('Hubo un error al crear el document');
      }

      //* 4. Devolvemos el DocumentEntity
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
