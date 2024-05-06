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
const rxjs_1 = require("rxjs");
const database_constants_1 = require("../../database/database.constants");
let FeedbackService = class FeedbackService {
    constructor(feedbackModel, req) {
        this.feedbackModel = feedbackModel;
        this.req = req;
    }
    findAll(keyword, skip = 0, limit = 10) {
        if (keyword) {
            return (0, rxjs_1.from)(this.feedbackModel
                .find({ title: { $regex: '.*' + keyword + '.*' } })
                .skip(skip)
                .limit(limit)
                .exec());
        }
        else {
            return (0, rxjs_1.from)(this.feedbackModel.find({}).skip(skip).limit(limit).exec());
        }
    }
    findById(id) {
        return (0, rxjs_1.from)(this.feedbackModel.findOne({ _id: id }).exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`video: $id was not found`)));
    }
    save(data) {
        const createQuestion = this.feedbackModel.create({
            ...data,
        });
        return (0, rxjs_1.from)(createQuestion);
    }
    update(id, data) {
        return (0, rxjs_1.from)(this.feedbackModel
            .findOneAndUpdate({ _id: id }, { ...data, updateBy: { _id: this.req.user.id } }, { new: true })
            .exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`feedback: $id was not found`)));
    }
    deleteAll() {
        return (0, rxjs_1.from)(this.feedbackModel.deleteMany({}).exec());
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