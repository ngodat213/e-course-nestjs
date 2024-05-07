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
exports.CourseLessonService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../database/database.constants");
const rxjs_1 = require("rxjs");
let CourseLessonService = class CourseLessonService {
    constructor(lessonModel, videoModel, req) {
        this.lessonModel = lessonModel;
        this.videoModel = videoModel;
        this.req = req;
    }
    async findAll(keyword, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = keyword ?
            { title: { $regex: keyword, $options: 'i' } } : {};
        return this.lessonModel.find({ ...query }).select('-__v').skip(skip).limit(limit).exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.lessonModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('CourseLesson not found.');
        }
        return res;
    }
    async save(data) {
        const existing = await this.lessonModel.findOne({ title: data.title });
        if (existing) {
            throw new common_1.BadRequestException('CourseLesson already exists');
        }
        const res = await this.lessonModel.create({ ...data });
        return res;
    }
    async updateById(id, data) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const existingCategory = await this.lessonModel.findOne({ title: data.title });
        if (existingCategory) {
            throw new common_1.BadRequestException('Category already exists');
        }
        const post = await this.lessonModel
            .findByIdAndUpdate(id, data)
            .setOptions({ overwrite: true, new: true });
        if (!post) {
            throw new common_1.NotFoundException();
        }
        return post;
    }
    deleteById(id) {
        return (0, rxjs_1.from)(this.lessonModel.findByIdAndDelete({ _id: id }).exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`lesson: $id was not found`)));
    }
    lessonsOf(id) {
        const lessons = this.videoModel
            .find({
            lesson: { _id: id },
        })
            .select('-course')
            .exec();
        return lessons;
    }
};
exports.CourseLessonService = CourseLessonService;
exports.CourseLessonService = CourseLessonService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.COURSE_LESSON_MODEL)),
    __param(1, (0, common_1.Inject)(database_constants_1.COURSE_VIDEO_MODEL)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object])
], CourseLessonService);
//# sourceMappingURL=course.lesson.service.js.map