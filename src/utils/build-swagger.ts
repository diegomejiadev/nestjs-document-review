import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const buildSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Document Review')
    .setDescription(
      'Backend dedicado a manejar la revision de documentos a través de los 3 tipos de usuarios (Aplicante - Reseñador - Aprobador)',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
