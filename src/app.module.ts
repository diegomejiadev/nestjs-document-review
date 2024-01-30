import { UserModule } from './modules/user/user.module';
import { DocumentModule } from './modules/document/document.module';
import { DatabaseModule } from './database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/config/.env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { ContextService } from './shared/services/context.service';
import { ContextMiddleware } from './core/middlewares/context.middleware';

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
  providers: [ContextService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
