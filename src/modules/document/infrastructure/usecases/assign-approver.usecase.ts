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
import { IApproverDatasource } from 'src/modules/approver/domain/interfaces/approver.datasource';

@Injectable()
export class AssignApproverUsecase {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private readonly repository: IDocumentDatasource,
    @Inject('APPROVER_REPOSITORY')
    private readonly approverRepository: IApproverDatasource,
  ) {}

  //TODO Se debe extraer del JWT del reviewer
  async handle(
    documentId: string,
    approverId: string,
  ): Promise<DocumentEntity> {
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
      const foundApprover = await this.approverRepository.findById(approverId);

      if (!foundApprover) {
        throw new NotFoundException('No se encontró el aprobador a asignar');
      }

      //* 4. Actualizamos el documento con el id del aprobador, asimismo lo manda a estado 'approver-assigned'
      const updatedDocument = await this.repository.assignApprover(
        documentId,
        approverId,
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
