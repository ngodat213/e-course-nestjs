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
import { Observable } from 'rxjs';
import { User, UserModel } from 'src/modules/user/user.model';
import { ChangeAvatarDTO, RegisterDto, ResetPasswordDTO, UpdateUserDTO } from './user.dto';
import { UserPrincipal } from 'src/interfaces/user-principal.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenResult } from 'src/interfaces/auth.interface';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';
import { ForgotPassword, ForgotPasswordModel } from './forgot.password.model';
import { EmailService } from 'src/processors/helper/helper.service.email';
export declare class UserService {
    private userModel;
    private forgotPwModel;
    private jwtService;
    private readonly cloudinaryService;
    private readonly emailService;
    constructor(userModel: UserModel, forgotPwModel: ForgotPasswordModel, jwtService: JwtService, cloudinaryService: CloudinaryService, emailService: EmailService);
    findByEmail(email: string): Observable<User | undefined>;
    findOneByEmail(email: string): Promise<User>;
    exitsByEmail(email: string): Observable<boolean>;
    register(data: RegisterDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(user: UserPrincipal): Observable<TokenResult>;
    validateUser(email: string, pass: string): Observable<UserPrincipal>;
    passwordTokenRandom(): string;
    sendEmailForgotPassword(email: string): Promise<boolean>;
    createForgotPasswordToken(email: string): Promise<ForgotPassword>;
    changedPassword(body: ResetPasswordDTO): Promise<boolean>;
    getForgottenPasswordModel(email: string, newPasswordToken: string): Promise<ForgotPassword>;
    findAll(keyword?: string, skip?: number, limit?: number): Observable<User[]>;
    changedAvatar(id: string, requestBody: ChangeAvatarDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
    updateById(id: string, requestBody: UpdateUserDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
}
