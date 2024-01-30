import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { buildSwagger } from './utils/build-swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Creamos un prefix global
  app.setGlobalPrefix('api');

  //* Agregamos ValidationPipe para class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //* Aumentamos el limite
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb' }));

  //* Agregamos ClassSerializerInterceptor para serializar los responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //* Implementamos la funcion para construir swagger
  buildSwagger(app);

  await app.listen(3000);
}
bootstrap();
