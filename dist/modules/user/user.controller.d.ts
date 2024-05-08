import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/user.model';
import { RegisterDto, UpdateUserDTO } from './user.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    GetAllUsers(keyword?: string, limit?: number, skip?: number): Observable<User[]>;
    GetCurrentUser(user: User): User;
    Login(req: AuthenticatedRequest, res: Response): Observable<Response>;
    Register(registerDto: RegisterDto, res: Response): Observable<Response>;
    updateUser(id: string, requestBody: UpdateUserDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
}
