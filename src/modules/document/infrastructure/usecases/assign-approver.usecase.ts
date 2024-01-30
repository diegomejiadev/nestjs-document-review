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
import { ContextService } from 'src/shared/services/context.service';

@Injectable()
export class AssignApproverUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
    @Inject('USER_REPOSITORY')
    private readonly approverRepository: IUserDatasource,
    private readonly contextService: ContextService,
  ) {}

  async handle(documentId: string): Promise<DocumentEntity> {
    try {
      //* 1. Verificamos que el document exista
      const foundDocument = await this.repository.findById(documentId);

      if (!foundDocument) {
        throw new NotFoundException('No se encontró el documento a asignar');
      }

      //* 2. Verificamos que no tenga ya un aprobador asignado
      if (foundDocument.getApproverId()) {
        throw new BadRequestException(
          'El documento ya tiene un aprobador asignado',
        );
      }

      //* 3. Verificamos que el aprobador exista
      const request = this.contextService.getRequest();

      const userId = request['user']['userId'];
      const foundApprover = await this.approverRepository.findById(userId);

      if (!foundApprover) {
        throw new NotFoundException('No se encontró el aprobador a asignar');
      }

      //* 4. Actualizamos el documento con el id del aprobador, asimismo lo manda a estado 'approver-assigned'
      const updatedDocument = await this.repository.assignApprover(
        documentId,
        userId,
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
