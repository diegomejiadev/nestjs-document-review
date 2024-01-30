import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { IUploadRepository } from 'src/modules/upload/domain/interfaces/upload.repository';
import { IDocumentDatasource } from '../../domain/interfaces/document.datasource';
import { ContextService } from '../../../../shared/services/context.service';
import { IUserDatasource } from 'src/modules/user/domain/interfaces/user.datasource';
import * as fs from 'fs/promises';

@Injectable()
export class UploadFileDocumentUsecase {
  constructor(
    @Inject('UPLOAD_REPOSITORY')
    private readonly uploadRepository: IUploadRepository,
    @Inject('DOCUMENT_REPOSITORY')
    private readonly documentRepository: IDocumentDatasource,
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserDatasource,
    private readonly contextService: ContextService,
  ) {}

  async handle(file: Express.Multer.File): Promise<DocumentEntity> {
    const { filename, path } = file;

    try {
      //* 1. Obtenemos el request
      const request = this.contextService.getRequest();
      const userId = request['user']['userId'];

      //* 2. Verificamos que nuestro usuario exista
      const foundApplicant = await this.userRepository.findById(userId);

      //* 3. Si no existe lanzamos un error
      if (!foundApplicant) {
        throw new NotFoundException(
          'No se encontró el aplicador que subirá el documento',
        );
      }

      //* 4. Subimos el archivo al repositorio de archivos externos
      await this.uploadRepository.uploadSingleFile(file);

      //* 5. Obtenemos el URL del archivo
      const fileUrl = await this.uploadRepository.getFileUrl(filename);

      //* 6. Eliminamos el archivo de la carpeta local
      await fs.unlink(path);

      //* 7. Creamos una instancia del documento en la base de datos
      const createdDocument = await this.documentRepository.create(
        userId,
        fileUrl,
        filename,
      );

      //* 8. Retornamos el documento
      return createdDocument;
    } catch (e) {
      await fs.unlink(path);
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
