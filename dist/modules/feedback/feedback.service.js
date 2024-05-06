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
const database_constants_1 = require("../../database/database.constants");
const rxjs_1 = require("rxjs");
let FeedbackService = class FeedbackService {
    constructor(feedbackModel, req) {
        this.feedbackModel = feedbackModel;
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
            query.user = { $regex: keywordUser, $options: 'i' };
        }
        if (keywordCourse) {
            query.course = { $regex: keywordCourse, $options: 'i' };
        }
        return this.feedbackModel.find({ ...query }).select('-__v').skip(skip).limit(limit).exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.feedbackModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Category not found.');
        }
        return res;
    }
    async save(data) {
        const res = await this.feedbackModel.create({ ...data });
        return res;
    }
    async updateById(id, category) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        return await this.feedbackModel.findByIdAndUpdate(id, category, {
            new: true,
            runValidators: true
        });
    }
    deleteById(id) {
        return (0, rxjs_1.from)(this.feedbackModel.findOneAndDelete({ _id: id }).exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`feedback: $id was not found`)));
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.FEEDBACK_MODEL)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map