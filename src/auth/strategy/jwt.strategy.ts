import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/configs/jwt.config';
import { JwtPayload } from '../interfaces/jwt.interface';
import { UserPrincipal } from '../interfaces/user-principal.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secretKey,
    });
  }

  validate(payload: any): any {
    return { email: payload.email, sub: payload.username };
  }
}