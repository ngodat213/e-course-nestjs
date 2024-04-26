import { Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/configs/jwt.config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigType<typeof jwtConfig>);
    validate(payload: any): any;
}
export {};
