import { UserModule } from './modules/user/user.module';
import { DocumentModule } from './modules/document/document.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/config/.env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    CommentModule,
    DocumentModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      validate,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
