"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseLessonController = void 0;
const common_1 = require("@nestjs/common");
const course_lesson_service_1 = require("./course.lesson.service");
const rxjs_1 = require("rxjs");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const course_lesson_dto_1 = require("./course.lesson.dto");
const swagger_1 = require("@nestjs/swagger");
let CourseLessonController = class CourseLessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    getAllLessons(keyword, limit, skip) {
        return this.lessonService.findAll(keyword, skip, limit);
    }
    getLessonById(id) {
        return this.lessonService.findById(id);
    }
    createLesson(lesson, res) {
        return this.lessonService.save(lesson).pipe((0, rxjs_1.map)((lesson) => {
            return res
                .location('/lessons' + lesson._id)
                .status(201)
                .send();
        }));
    }
    updateLesson(id, lesson, res) {
        return this.lessonService.update(id, lesson).pipe((0, rxjs_1.map)((lesson) => {
            return res.status(204).send();
        }));
    }
    deleteLessonById(id, res) {
        return this.lessonService.deleteById(id).pipe((0, rxjs_1.map)((lesson) => {
            return res.status(204).send();
        }));
    }
    getAllLessonsOfLesson(id) {
        return this.lessonService.videosOf(id);
    }
};
exports.CourseLessonController = CourseLessonController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseLessonController.prototype, "getAllLessons", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseLessonController.prototype, "getLessonById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_lesson_dto_1.CreateCourseLessonDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseLessonController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_lesson_dto_1.UpdateCourseLessonDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseLessonController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseLessonController.prototype, "deleteLessonById", null);
__decorate([
    (0, common_1.Get)(':id/videos'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseLessonController.prototype, "getAllLessonsOfLesson", null);
exports.CourseLessonController = CourseLessonController = __decorate([
    (0, swagger_1.ApiTags)('Course Lesson'),
    (0, common_1.Controller)({ path: 'course/lessons', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [course_lesson_service_1.CourseLessonService])
], CourseLessonController);
//# sourceMappingURL=course.lesson.controller.js.map