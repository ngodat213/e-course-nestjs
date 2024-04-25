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
exports.CourseVideoController = void 0;
const common_1 = require("@nestjs/common");
const course_video_service_1 = require("./course.video.service");
const rxjs_1 = require("rxjs");
const parse_object_id_pipe_1 = require("../../shared/pipe/parse.object.id.pipe");
const course_video_dto_1 = require("./course.video.dto");
const swagger_1 = require("@nestjs/swagger");
let CourseVideoController = class CourseVideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    getAllVideos(keyword, limit, skip) {
        return this.videoService.findAll(keyword, limit, skip);
    }
    getCourseById(id) {
        return this.videoService.findById(id);
    }
    createCourse(video, res) {
        return this.videoService.save(video).pipe((0, rxjs_1.map)((video) => {
            return res
                .location('/videos' + video._id)
                .status(201)
                .send();
        }));
    }
    updateCourse(id, video, res) {
        return this.videoService.update(id, video).pipe((0, rxjs_1.map)((video) => {
            return res.status(204).send();
        }));
    }
    deleteCourseById(id, res) {
        return this.videoService.deleteById(id).pipe((0, rxjs_1.map)((video) => {
            return res.status(204).send();
        }));
    }
};
exports.CourseVideoController = CourseVideoController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('skip', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseVideoController.prototype, "getAllVideos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseVideoController.prototype, "getCourseById", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_video_dto_1.CreateCourseVideoDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseVideoController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, course_video_dto_1.UpdateCourseVideoDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseVideoController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_object_id_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], CourseVideoController.prototype, "deleteCourseById", null);
exports.CourseVideoController = CourseVideoController = __decorate([
    (0, swagger_1.ApiTags)('Course Video'),
    (0, common_1.Controller)({ path: 'course/videos', scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [course_video_service_1.CourseVideoService])
], CourseVideoController);
//# sourceMappingURL=course.video.controller.js.map