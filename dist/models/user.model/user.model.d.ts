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
import { Connection, Document, Model } from 'mongoose';
import { BlogModel } from '../blog.model/blog.model';
import { CourseModel } from '../course.model/course.model';
import { QuizModel } from '../quiz.model/quiz.model';
import { TeacherModel } from '../teacher.model/teacher.model';
interface User extends Document {
    readonly _id: string;
    readonly email: string;
    readonly password: string;
    readonly username: string;
    readonly photoUrl: string;
    readonly blogs: Partial<BlogModel>;
    readonly qAs: Partial<BlogModel>;
    readonly courses: Partial<CourseModel>;
    readonly favouritesCourses: Partial<CourseModel>;
    readonly favouritesQuizs: Partial<QuizModel>;
    readonly finishedQuizs: Partial<QuizModel>;
    readonly favouritesTeachers: Partial<TeacherModel>;
    readonly favouritesBlogs: Partial<BlogModel>;
    readonly favouritesQAs: Partial<BlogModel>;
    readonly created: Date;
    readonly signedIn: Date;
}
type UserModel = Model<User>;
declare const createUserModel: (conn: Connection) => UserModel;
export { User, UserModel, createUserModel };