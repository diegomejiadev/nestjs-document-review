import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE } from '../constants/role.enum';
import { ROLES_KEY } from '../constants/public.cst';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasSomeRole = requiredRoles.some((role) => user.role == role);

    if (!hasSomeRole) {
      throw new ForbiddenException(
        'El usuario no tiene los permisos para hacer esta peticion',
      );
    }

    return true;
  }
}
