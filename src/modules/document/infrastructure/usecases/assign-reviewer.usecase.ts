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
import { IUserDatasource } from 'src/modules/user/domain/interfaces/user.datasource';
import { ContextService } from '../../../../shared/services/context.service';

@Injectable()
export class AssignReviewerUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
    @Inject('USER_REPOSITORY')
    private readonly reviewerRepository: IUserDatasource,
    private readonly contextService: ContextService,
  ) {}

  async handle(documentId: string): Promise<DocumentEntity> {
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
      const request = this.contextService.getRequest();

      const userId = request['user']['userId'];
      const foundReviewer = await this.reviewerRepository.findById(userId);

      if (!foundReviewer) {
        throw new NotFoundException('No se encontró el reseñador a asignar');
      }

      //* 4. Actualizamos el documento con el id del reseñador, asimismo lo manda a estado 'reviewer-assigned'
      const updatedDocument = await this.repository.assignReviewer(
        documentId,
        userId,
      );

      //* 5. Devolvemos el entity
      return updatedDocument;
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
