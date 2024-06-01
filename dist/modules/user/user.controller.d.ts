/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/user.model';
import { ChangeAvatarDTO, RegisterDto, UpdateUserDTO, ResetPasswordDTO } from './user.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    GetAllUsers(keyword?: string, limit?: number, skip?: number): Observable<User[]>;
    GetCurrentUser(user: User): User;
    Login(req: AuthenticatedRequest, res: Response): Observable<Response>;
    Register(registerDto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUser(id: string, requestBody: UpdateUserDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
    updateAvatarUser(id: string, body: ChangeAvatarDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
    resetPassword(email: string): Promise<boolean>;
    setNewPassword(requestBody: ResetPasswordDTO): Promise<boolean>;
    deleteFeedbackById(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
