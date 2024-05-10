"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseVideoModule = void 0;
const common_1 = require("@nestjs/common");
const course_video_controller_1 = require("./course.video.controller");
const course_video_service_1 = require("./course.video.service");
const database_module_1 = require("../../processors/database/database.module");
const user_service_1 = require("../user/user.service");
let CourseVideoModule = class CourseVideoModule {
};
exports.CourseVideoModule = CourseVideoModule;
exports.CourseVideoModule = CourseVideoModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [course_video_controller_1.CourseVideoController],
        providers: [course_video_service_1.CourseVideoService, user_service_1.UserService]
    })
], CourseVideoModule);
//# sourceMappingURL=course.video.module.js.map