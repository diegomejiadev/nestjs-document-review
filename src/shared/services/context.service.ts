import { Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private _request: Request;

  setRequest(request: Request): void {
    this._request = request;
  }

  getRequest(): Request {
    return this._request;
  }
}
