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
import { Teacher } from '../teacher.model/teacher.model';
import { CourseLessonModel } from '../course.lesson.model/course.lesson.model';
import { FeedbackModel } from '../feedback.model/feedback.model';
interface Course extends Document {
    readonly _id: string;
    readonly teacherId: Partial<Teacher>;
    readonly courseImage: string;
    readonly title: string;
    readonly description: string;
    readonly time: string;
    readonly category: string;
    readonly rating: Number;
    readonly register: Number;
    readonly lessons: Partial<CourseLessonModel>;
    readonly feedbacks: Partial<FeedbackModel>;
}
type CourseModel = Model<Course>;
declare const createCourseModel: (conn: Connection) => CourseModel;
export { Course, CourseModel, createCourseModel };
