import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/core/constants/public.cst';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
