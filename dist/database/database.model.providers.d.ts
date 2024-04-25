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
import { Connection } from 'mongoose';
export declare const databaseModelsProviders: ({
    provide: string;
    useFactory: (connection: Connection) => import("src/models/course.model/course.model").CourseModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/course.lesson.model/course.lesson.model").CourseLessonModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/course.video.model/course.video.model").CourseVideoModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/course.order.model/course.order.model").CourseOrderModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/exam.model/exam.model").ExamModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/exam.lesson.model/exam.lesson.model").ExamLessonModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/exam.history.model/exam.history.model").ExamHistoryModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/user.model/user.model").UserModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/feedback.model/feedback.model").FeedbackModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/blog.model/blog.model").BlogModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/category.model/category.model").CategoryModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/models/contact.model/contact.model").ContactModel;
    inject: string[];
})[];
