import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/core/constants/public.cst';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { JsonWebTokenError } from '@nestjs/jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_JWT_TOKEN,
    });
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user || info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Debe ingresar un JWT válido');
    }

    return super.handleRequest(err, user, info, context, status);
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
