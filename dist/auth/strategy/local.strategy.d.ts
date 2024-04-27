import { Strategy } from 'passport-local';
import { Observable } from 'rxjs';
import { UserService } from 'src/modules/user/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: UserService);
    validate(username: string, password: string): Observable<any>;
}
export {};
