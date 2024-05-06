import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';

export class Permission {
  static check(id: string, currentUser: User) {
    const roles = ['Admin'];
    if (id === currentUser.id) return;
    
    if (currentUser.roles.some(role => roles.includes(role))) return;

    throw new ForbiddenException('User can not perform action');
  }
}