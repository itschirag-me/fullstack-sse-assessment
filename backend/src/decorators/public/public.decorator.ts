import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';

export const Public = (...args: string[]) => SetMetadata(IS_PUBLIC, true);
