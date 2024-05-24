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
exports.ExamLessonService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../processors/database/database.constants");
let ExamLessonService = class ExamLessonService {
    constructor(lessonModel, questionModel, req) {
        this.lessonModel = lessonModel;
        this.questionModel = questionModel;
        this.req = req;
    }
    async findAll(keyword, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = {};
        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }
        return this.lessonModel.find(query)
            .select('-__v')
            .skip(skip)
            .limit(limit)
            .exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.lessonModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Exam lesson not found.');
        }
        return res;
    }
    async save(data) {
        const existing = await this.lessonModel.findOne({ title: data.title });
        if (existing) {
            throw new common_1.BadRequestException('Exam lesson already exists');
        }
        const existingSelection = await this.lessonModel.findOne({ selection: data.selection });
        if (existingSelection) {
            throw new common_1.BadRequestException('Selection already exists');
        }
        const res = await this.lessonModel.create({ ...data });
        return res;
    }
    async updateById(id, data) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const existingSelection = await this.lessonModel.findOne({ selection: data.selection });
        if (existingSelection.id != id && existingSelection) {
            throw new common_1.BadRequestException('Selection already exists');
        }
        const updated = await this.lessonModel
            .findByIdAndUpdate(id, data)
            .setOptions({ overwrite: true, new: true });
        if (!updated) {
            throw new common_1.NotFoundException();
        }
        return updated;
    }
    async deleteById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const value = await this.lessonModel.findById(id);
        return this.softRemove(value);
    }
    async softRemove(value) {
        if (value.deleteAt != null) {
            value.deleteAt = null;
        }
        else {
            value.deleteAt = new Date();
        }
        const deleted = await this.lessonModel
            .findByIdAndUpdate(value.id, value)
            .setOptions({ overwrite: true, new: true });
        return deleted;
    }
    questionsOf(id) {
        const lessons = this.questionModel
            .find({
            lesson: { _id: id }
        })
            .select('-exam')
            .exec();
        return lessons;
    }
};
exports.ExamLessonService = ExamLessonService;
exports.ExamLessonService = ExamLessonService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.EXAM_LESSON_MODEL)),
    __param(1, (0, common_1.Inject)(database_constants_1.EXAM_QUESTION_MODEL)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object])
], ExamLessonService);
//# sourceMappingURL=exam.lesson.service.js.map