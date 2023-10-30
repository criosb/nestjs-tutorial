import { SetMetadata } from '@nestjs/common';
import { ROLES, ROLES_KEY } from '../../constants';

export const Roles = (...roles: Array<ROLES>) => SetMetadata(ROLES_KEY, roles);
