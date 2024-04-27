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
import { Teacher } from '../teacher/teacher.model';
import { CategoryModel } from '../category/category.model';
interface Course extends Document {
    readonly title: string;
    readonly price: Number;
    readonly description: string;
    readonly rating: Number;
    readonly register: Number;
    readonly imageIntroduce: string;
    readonly imagePublicId: string;
    readonly videoIntroduce: string;
    readonly videoPublicId: string;
    readonly time: Number;
    readonly language: string;
    readonly updateAt: Date;
    readonly createAt: Date;
    readonly teacher: Partial<Teacher>;
    readonly category: Partial<CategoryModel>;
}
type CourseModel = Model<Course>;
declare const createCourseModel: (conn: Connection) => CourseModel;
export { Course, CourseModel, createCourseModel };
