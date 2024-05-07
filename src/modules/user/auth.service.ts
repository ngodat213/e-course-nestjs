import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterDto } from './user.dto';
import { Observable, from, map } from 'rxjs';
import { User } from './user.model';
import { UserPrincipal } from 'src/interfaces/user-principal.interface';
import { TokenResult } from 'src/interfaces/auth.interface';
import { JwtPayload } from 'src/interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  register(data: RegisterDto): Observable<User>{
    return this.userService.create(data);
  }

  login(user: UserPrincipal): Observable<TokenResult>{
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      photoUrl: user.photoUrl,
      roles: user.roles,
    };
    return from(this.jwtService.signAsync(payload)).pipe(
      map((access_token) => {
        return {access_token};
      }),
    );
  }
}