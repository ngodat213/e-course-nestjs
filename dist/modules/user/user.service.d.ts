import { Observable } from 'rxjs';
import { User, UserModel } from 'src/modules/user/user.model';
import { RegisterDto } from './user.dto';
import { UserPrincipal } from 'src/interfaces/user-principal.interface';
import { TokenResult } from 'src/interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: UserModel, jwtService: JwtService);
    findByEmail(email: string): Observable<User | undefined>;
    exitsByEmail(email: string): Observable<boolean>;
    register(data: RegisterDto): Observable<User>;
    validateUser(email: string, pass: string): Observable<UserPrincipal>;
    login(user: UserPrincipal): Observable<TokenResult>;
    findAll(keyword?: string, skip?: number, limit?: number): Observable<User[]>;
    findById(id: string, withCourses?: boolean, withExams?: boolean, withBlogs?: boolean, withQAs?: boolean, withFvCourses?: boolean, withFvExams?: boolean, withFvTeacher?: boolean, withFvQAs?: boolean): Observable<User>;
    lock(id: string): Observable<User>;
}
