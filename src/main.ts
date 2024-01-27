import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { buildSwagger } from './utils/build-swagger';

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

  //* Agregamos ClassSerializerInterceptor para serializar los responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //* Implementamos la funcion para construir swagger
  buildSwagger(app);

  await app.listen(3000);
}
bootstrap();
