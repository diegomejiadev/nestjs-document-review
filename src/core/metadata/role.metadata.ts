import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../constants/role.enum';
import { ROLES_KEY } from '../constants/public.cst';

export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
