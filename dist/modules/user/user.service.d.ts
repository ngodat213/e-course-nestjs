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
import { Observable } from 'rxjs';
import { User, UserModel } from 'src/modules/user/user.model';
import { RegisterDto, UpdateUserDTO } from './user.dto';
import { UserPrincipal } from 'src/interfaces/user-principal.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenResult } from 'src/interfaces/auth.interface';
export declare class UserService {
    private userModel;
    private jwtService;
    constructor(userModel: UserModel, jwtService: JwtService);
    findByEmail(email: string): Observable<User | undefined>;
    findOneByEmail(email: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, User, "findOne">;
    exitsByEmail(email: string): Observable<boolean>;
    register(data: RegisterDto): Observable<User>;
    login(user: UserPrincipal): Observable<TokenResult>;
    validateUser(email: string, pass: string): Observable<UserPrincipal>;
    findAll(keyword?: string, skip?: number, limit?: number): Observable<User[]>;
    updateById(id: string, requestBody: UpdateUserDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
}
