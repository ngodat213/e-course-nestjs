/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/connection" />
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
/// <reference types="mongoose/types/inferschematype" />
import { Connection, Document, Model, Schema } from 'mongoose';
import { CourseModel } from '../course/course.model';
import { ExamModel } from '../exam/exam.model';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { Observable } from 'rxjs';
interface User extends Document {
    comparePassword(password: string): Observable<boolean>;
    readonly email: string;
    readonly password: string;
    readonly username: string;
    photoUrl: string;
    photoPublicId: string;
    readonly roles?: RoleType[];
    courses: Partial<CourseModel>;
    favouritesCourses: Partial<CourseModel>;
    favouritesExams: Partial<ExamModel>;
    finishedExams: Partial<ExamModel>;
}
type UserModel = Model<User>;
declare const UserSchema: Schema<User, Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare function preSaveHook(next: any): Promise<any>;
declare function comparePasswordMethod(password: string): Observable<boolean>;
declare const createUserModel: (conn: Connection) => UserModel;
export { User, UserModel, createUserModel, UserSchema, preSaveHook, comparePasswordMethod };
