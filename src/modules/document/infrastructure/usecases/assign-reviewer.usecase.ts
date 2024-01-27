import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { IReviewerDatasource } from 'src/modules/reviewer/domain/interfaces/reviewer.datasource';

@Injectable()
export class AssignReviewerUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
    @Inject('REVIEWER_REPOSITORY')
    private readonly reviewerRepository: IReviewerDatasource,
  ) {}

  //TODO Se debe extraer del JWT del reviewer
  async handle(
    documentId: string,
    reviewerId: string,
  ): Promise<DocumentEntity> {
    try {
      //* 1. Verificamos que el document exista
      const foundDocument = await this.repository.findById(documentId);

      if (!foundDocument) {
        throw new NotFoundException('No se encontró el documento a asignar');
      }

      //* 2. Verificamos que no tenga ya un reseñador asignado
      if (foundDocument.getReviewerId()) {
        throw new BadRequestException(
          'El documento ya tiene un reseñador asignado',
        );
      }

      //* 3. Verificamos que el reseñador exista
      const foundReviewer = await this.reviewerRepository.findById(reviewerId);

      if (!foundReviewer) {
        throw new NotFoundException('No se encontró el reseñador a asignar');
      }

      //* 4. Actualizamos el documento con el id del reseñador, asimismo lo manda a estado 'reviewer-assigned'
      const updatedDocument = await this.repository.assignReviewer(
        documentId,
        reviewerId,
      );

      //* 5. Devolvemos el entity
      return updatedDocument;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
