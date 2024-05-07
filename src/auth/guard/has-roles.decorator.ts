import { SetMetadata } from '@nestjs/common';
import { HAS_ROLES_KEY } from '../auth.constants';
import { RoleType } from 'src/shared/enum/role.type.enum';

export const HasRoles = (...args: RoleType[]) => SetMetadata(HAS_ROLES_KEY, args);