import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';
import { UserPrincipal } from 'src/interfaces/user-principal.interface';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserPrincipal> {
    const user: UserPrincipal = await lastValueFrom(
      this.authService.validateUser(email, password),
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}