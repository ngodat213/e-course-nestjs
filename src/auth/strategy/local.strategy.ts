import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Observable, lastValueFrom, throwIfEmpty } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: UserService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  validate(username: string, password: string): Observable<any> {
    return this.authService
      .validateUser(username, password)
      .pipe(throwIfEmpty(() => new UnauthorizedException()));
  }
}