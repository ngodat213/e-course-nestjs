import { Observable } from 'rxjs';
import { User, UserModel } from 'src/models/user.model/user.model';
import { RegisterDto } from './user.dto';
import { UserPrincipal } from 'src/auth/interfaces/user-principal.interface';
import { TokenResult } from 'src/auth/interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: UserModel, jwtService: JwtService);
    findByEmail(email: string): Observable<User>;
    exitsByEmail(email: string): Observable<boolean>;
    register(data: RegisterDto): Observable<User>;
    validateUser(username: string, pass: string): Observable<UserPrincipal>;
    login(user: UserPrincipal): Observable<TokenResult>;
    findById(id: string, withCourses?: boolean, withExams?: boolean, withBlogs?: boolean, withQAs?: boolean, withFvCourses?: boolean, withFvExams?: boolean, withFvTeacher?: boolean, withFvQAs?: boolean): Observable<User>;
}
