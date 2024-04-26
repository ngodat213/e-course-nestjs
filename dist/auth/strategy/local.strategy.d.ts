import { Strategy } from 'passport-local';
import { UserService } from 'src/modules/user/user.service';
import { UserPrincipal } from '../interfaces/user-principal.interface';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: UserService);
    validate(username: string, password: string): Promise<UserPrincipal>;
}
export {};
