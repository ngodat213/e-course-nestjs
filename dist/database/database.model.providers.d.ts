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
    useFactory: (connection: Connection) => import("src/modules/course/course.model").CourseModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/course.lesson/course.lesson.model").CourseLessonModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/course.video/course.video.model").CourseVideoModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/course.order/course.order.model").CourseOrderModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/exam/exam.model").ExamModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/exam.lesson/exam.lesson.model").ExamLessonModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/exam.history/exam.history.model").ExamHistoryModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/user/user.model").UserModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/feedback/feedback.model").FeedbackModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/blog/blog.model").BlogModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/category/category.model").CategoryModel;
    inject: string[];
} | {
    provide: string;
    useFactory: (connection: Connection) => import("src/modules/contact/contact.model").ContactModel;
    inject: string[];
})[];
