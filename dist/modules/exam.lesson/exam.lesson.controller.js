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
exports.ExamLessonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const exam_lesson_service_1 = require("./exam.lesson.service");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const exam_lesson_dto_1 = require("./exam.lesson.dto");
const responser_decorator_1 = require("../../decorators/responser.decorator");
let ExamLessonController = class ExamLessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    getAllCourseLessons(keyword, limit, skip) {
        return this.lessonService.findAll(keyword, skip, limit);
    }
    getCourseLessonById(id) {
        return this.lessonService.findById(id);
    }
    createCourseLesson(lesson) {
        return this.lessonService.save(lesson);
    }
    updateCourseLesson(id, lesson) {
        return this.lessonService.updateById(id, lesson);
    }
    deleteLessonById(id, res) {
        return this.lessonService.deleteById(id).pipe((0, rxjs_1.map)((lesson) => {
            return res.status(204).send();
        }));
    }
    getAllExamOfLesson(id) {
        return this.lessonService.questionsOf(id);
    }
};
exports.ExamLessonController = ExamLessonController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ExamLessonController.prototype, "getAllCourseLessons", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamLessonController.prototype, "getCourseLessonById", null);
__decorate([
    (0, common_1.Post)(''),
    responser_decorator_1.Responser.handle('Create course lesson'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exam_lesson_dto_1.CreateExamLessonDTO]),
    __metadata("design:returntype", void 0)
], ExamLessonController.prototype, "createCourseLesson", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, exam_lesson_dto_1.UpdateExamLessonDTO]),
    __metadata("design:returntype", Promise)
], ExamLessonController.prototype, "updateCourseLesson", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ExamLessonController.prototype, "deleteLessonById", null);
__decorate([
    (0, common_1.Get)(':id/questions'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamLessonController.prototype, "getAllExamOfLesson", null);
exports.ExamLessonController = ExamLessonController = __decorate([
    (0, swagger_1.ApiTags)('Exam Lesson'),
    (0, common_1.Controller)({ path: 'exam/lessons', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [exam_lesson_service_1.ExamLessonService])
], ExamLessonController);
//# sourceMappingURL=exam.lesson.controller.js.map