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
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../processors/database/database.constants");
let FeedbackService = class FeedbackService {
    constructor(feedbackModel, courseModel, req) {
        this.feedbackModel = feedbackModel;
        this.courseModel = courseModel;
        this.req = req;
    }
    async findAll(keywordUser, keywordCourse, skip = 0, limit = 10) {
        if (keywordUser && keywordUser.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        if (keywordCourse && keywordCourse.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = {};
        if (keywordUser) {
            query.user = keywordUser;
        }
        if (keywordCourse) {
            query.course = keywordCourse;
        }
        return this.feedbackModel.find(query)
            .select('-__v')
            .skip(skip)
            .limit(limit)
            .populate('user', 'email username photoUrl')
            .exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.feedbackModel
            .findById(id)
            .populate('user', 'email username photoUrl');
        if (!res) {
            throw new common_1.NotFoundException('Category not found.');
        }
        return res;
    }
    async save(data) {
        const courseFindOne = await this.courseModel.findById(data.course);
        if (!courseFindOne) {
            throw new Error("Course not found");
        }
        courseFindOne.rating = (courseFindOne.rating * courseFindOne.reviews + data.rating) / (courseFindOne.reviews + 1);
        courseFindOne.reviews++;
        await courseFindOne.save();
        const res = await this.feedbackModel.create({ ...data });
        return res;
    }
    async updateById(id, data) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const updated = await this.feedbackModel
            .findByIdAndUpdate(id, data)
            .setOptions({ overwrite: true, new: true });
        if (!updated) {
            throw new common_1.NotFoundException();
        }
        return updated;
    }
    async deleteById(id) {
        try {
            const isValidId = mongoose_1.default.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter correct id.');
            }
            const value = await this.feedbackModel.findById(id);
            return this.softRemove(value);
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException(err);
        }
    }
    async softRemove(value) {
        if (value.deleteAt != null) {
            value.deleteAt = null;
        }
        else {
            value.deleteAt = new Date();
        }
        const deleted = await this.feedbackModel
            .findByIdAndUpdate(value.id, value)
            .setOptions({ overwrite: true, new: true });
        return deleted;
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.FEEDBACK_MODEL)),
    __param(1, (0, common_1.Inject)(database_constants_1.COURSE_MODEL)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map