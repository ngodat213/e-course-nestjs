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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const rxjs_1 = require("rxjs");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const course_dto_1 = require("./course.dto");
const swagger_1 = require("@nestjs/swagger");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    getAllCourses(keyword, limit, skip) {
        return this.courseService.findAll(keyword, skip, limit);
    }
    getCourseById(id) {
        return this.courseService.findById(id);
    }
    createCourse(course, res) {
        return this.courseService.save(course).pipe((0, rxjs_1.map)((course) => {
            return res
                .location('/courses' + course._id)
                .status(201)
                .send();
        }));
    }
    updateCourse(id, course, res) {
        return this.courseService.update(id, course).pipe((0, rxjs_1.map)((course) => {
            return res.status(204).send();
        }));
    }
    deleteCourseById(id, res) {
        return this.courseService.deleteById(id).pipe((0, rxjs_1.map)((course) => {
            return res.status(204).send();
        }));
    }
    getAllLessonsOfCourse(id) {
        return this.courseService.lessonsOf(id);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseController.prototype, "getCourseById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_dto_1.CreateCourseDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_dto_1.UpdateCourseDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseController.prototype, "deleteCourseById", null);
__decorate([
    (0, common_1.Get)(':id/lessons'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseController.prototype, "getAllLessonsOfCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiTags)('Course'),
    (0, common_1.Controller)({ path: 'courses', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map