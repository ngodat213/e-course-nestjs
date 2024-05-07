import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { RegisterDto } from './user.dto';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UserPrincipal } from 'src/interfaces/user-principal.interface';
import { TokenResult } from 'src/interfaces/auth.interface';
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    register(data: RegisterDto): Observable<User>;
    login(user: UserPrincipal): Observable<TokenResult>;
}
