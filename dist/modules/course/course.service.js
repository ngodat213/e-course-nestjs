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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const rxjs_1 = require("rxjs");
const database_constants_1 = require("../../database/database.constants");
let CourseService = class CourseService {
    constructor(courseModel, teacherModel, courseLessonModel, req) {
        this.courseModel = courseModel;
        this.teacherModel = teacherModel;
        this.courseLessonModel = courseLessonModel;
        this.req = req;
    }
    async findAll(keyword, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = keyword ?
            { title: { $regex: keyword, $options: 'i' } } : {};
        return this.courseModel.find({ ...query }).select('-__v').skip(skip).limit(limit).exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.courseModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Course not found.');
        }
        return res;
    }
    async save(data) {
        const existing = await this.courseModel.findOne({ title: data.title });
        if (existing) {
            throw new common_1.BadRequestException('Course already exists');
        }
        const res = await this.courseModel.create({ ...data });
        return res;
    }
    async updateById(id, data) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const post = await this.courseModel
            .findByIdAndUpdate(id, data)
            .setOptions({ overwrite: true, new: true });
        if (!post) {
            throw new common_1.NotFoundException();
        }
        return post;
    }
    deleteAll() {
        return this.courseModel.deleteMany({}).exec();
    }
    deleteById(id) {
        return (0, rxjs_1.from)(this.courseModel.findOneAndDelete({ _id: id }).exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`course: $id was not found`)));
    }
    lessonsOf(id) {
        const lessons = this.courseLessonModel
            .find({
            course: { _id: id },
        })
            .select('-course')
            .exec();
        return lessons;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.COURSE_MODEL)),
    __param(1, (0, common_1.Inject)(database_constants_1.USER_MODEL)),
    __param(2, (0, common_1.Inject)(database_constants_1.COURSE_LESSON_MODEL)),
    __param(3, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model, Object])
], CourseService);
//# sourceMappingURL=course.service.js.map