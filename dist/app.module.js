"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./modules/user/user.module");
const course_module_1 = require("./modules/course/course.module");
const course_lesson_module_1 = require("./modules/course.lesson/course.lesson.module");
const course_video_module_1 = require("./modules/course.video/course.video.module");
const exam_module_1 = require("./modules/exam/exam.module");
const exam_lesson_module_1 = require("./modules/exam.lesson/exam.lesson.module");
const exam_question_module_1 = require("./modules/exam.question/exam.question.module");
const category_module_1 = require("./modules/category/category.module");
const course_order_module_1 = require("./modules/course.order/course.order.module");
const exam_history_module_1 = require("./modules/exam.history/exam.history.module");
const feedback_module_1 = require("./modules/feedback/feedback.module");
const blog_module_1 = require("./modules/blog/blog.module");
const database_module_1 = require("./database/database.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const helper_module_1 = require("./helper/helper.module");
const contact_module_1 = require("./modules/contact/contact.module");
const teacher_service_1 = require("./modules/teacher/teacher.service");
const teacher_controller_1 = require("./modules/teacher/teacher.controller");
const teacher_module_1 = require("./modules/teacher/teacher.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ ignoreEnvFile: true }),
            database_module_1.DatabaseModule,
            contact_module_1.ContactModule,
            course_module_1.CourseModule,
            course_lesson_module_1.CourseLessonModule,
            course_video_module_1.CourseVideoModule,
            course_order_module_1.CourseOrderModule,
            exam_module_1.ExamModule,
            exam_lesson_module_1.ExamLessonModule,
            exam_question_module_1.ExamQuestionModule,
            exam_history_module_1.ExamHistoryModule,
            user_module_1.UserModule,
            feedback_module_1.FeedbackModule,
            category_module_1.CategoryModule,
            blog_module_1.BlogModule,
            teacher_module_1.TeacherModule,
            cloudinary_module_1.CloudinaryModule,
            helper_module_1.HelperModuleModule,
        ],
        controllers: [app_controller_1.AppController, teacher_controller_1.TeacherController],
        providers: [
            app_service_1.AppService,
            teacher_service_1.TeacherService,
        ],
        exports: [app_service_1.AppService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map