import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { DocumentEntity } from '../../domain/entities/document.entity';

@Injectable()
export class FindDocumentByIdUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
  ) {}

  async handle(documentId: string): Promise<DocumentEntity> {
    try {
      const foundDocument = await this.repository.findById(documentId);

      if (!foundDocument) {
        throw new NotFoundException('No se encontró el documento');
      }

      return foundDocument;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
