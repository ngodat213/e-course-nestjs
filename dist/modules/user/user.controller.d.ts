import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/user.model';
import { RegisterDto } from './user.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(id: string, withCourses: boolean, withExams: boolean, withBlogs: boolean, withQAs: boolean, withFvCourses: boolean, withFvExams: boolean, withFvTeacher: boolean, withFvQAs: boolean): Observable<Partial<User>>;
    GetAllUsers(keyword?: string, limit?: number, skip?: number): Observable<User[]>;
    GetCurrentUser(user: User): User;
    Login(req: AuthenticatedRequest, res: Response): Observable<Response>;
    Register(registerDto: RegisterDto, res: Response): Observable<Response>;
}
