"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseModelsProviders = void 0;
const database_constants_1 = require("./database.constants");
const course_model_1 = require("../../modules/course/course.model");
const course_lesson_model_1 = require("../../modules/course.lesson/course.lesson.model");
const course_video_model_1 = require("../../modules/course.video/course.video.model");
const course_order_model_1 = require("../../modules/course.order/course.order.model");
const exam_model_1 = require("../../modules/exam/exam.model");
const exam_lesson_model_1 = require("../../modules/exam.lesson/exam.lesson.model");
const exam_history_model_1 = require("../../modules/exam.history/exam.history.model");
const user_model_1 = require("../../modules/user/user.model");
const feedback_model_1 = require("../../modules/feedback/feedback.model");
const category_model_1 = require("../../modules/category/category.model");
const contact_model_1 = require("../../modules/contact/contact.model");
const forgot_password_model_1 = require("../../modules/user/forgot.password.model");
const exam_question_model_1 = require("../../modules/exam.question/exam.question.model");
exports.databaseModelsProviders = [
    {
        provide: database_constants_1.COURSE_MODEL,
        useFactory: (connection) => (0, course_model_1.createCourseModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.COURSE_LESSON_MODEL,
        useFactory: (connection) => (0, course_lesson_model_1.createCourseLessonModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.COURSE_VIDEO_MODEL,
        useFactory: (connection) => (0, course_video_model_1.createCourseVideoModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.COURSE_ORDER_MODEL,
        useFactory: (connection) => (0, course_order_model_1.createCourseOrderModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.EXAM_MODEL,
        useFactory: (connection) => (0, exam_model_1.createExamModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.EXAM_LESSON_MODEL,
        useFactory: (connection) => (0, exam_lesson_model_1.createExamLessonModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.EXAM_QUESTION_MODEL,
        useFactory: (connection) => (0, exam_question_model_1.createExamQuestionModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.EXAM_HISTORY_MODEL,
        useFactory: (connection) => (0, exam_history_model_1.createExamHistoryModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.USER_MODEL,
        useFactory: (connection) => (0, user_model_1.createUserModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.FEEDBACK_MODEL,
        useFactory: (connection) => (0, feedback_model_1.createFeedbackModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.USER_MODEL,
        useFactory: (connection) => (0, user_model_1.createUserModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.CATEGORY_MODEL,
        useFactory: (connection) => (0, category_model_1.createCategoryModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.CONTACT_MODEL,
        useFactory: (connection) => (0, contact_model_1.createContactModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    },
    {
        provide: database_constants_1.FORGOT_PASSWORD_MODEL,
        useFactory: (connection) => (0, forgot_password_model_1.createForgotPasswordModel)(connection),
        inject: [database_constants_1.DATABASE_CONNECTION]
    }
];
//# sourceMappingURL=database.model.providers.js.map