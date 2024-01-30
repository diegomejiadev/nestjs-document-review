import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ContextService } from 'src/shared/services/context.service';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.contextService.setRequest(req);
    next();
  }
}
