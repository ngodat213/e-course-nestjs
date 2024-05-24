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
exports.ExamHistoryService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../processors/database/database.constants");
let ExamHistoryService = class ExamHistoryService {
    constructor(historyModel, req) {
        this.historyModel = historyModel;
        this.req = req;
    }
    async findAll(keywordUser, keywordExam, skip = 0, limit = 10) {
        if (keywordUser && keywordUser.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        if (keywordExam && keywordExam.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = {};
        if (keywordUser) {
            query.user = { $regex: keywordUser, $options: 'i' };
        }
        if (keywordExam) {
            query.course = { $regex: keywordExam, $options: 'i' };
        }
        return this.historyModel.find({ ...query }).select('-__v').skip(skip).limit(limit).exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.historyModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('CourseOrder not found.');
        }
        return res;
    }
    async save(data) {
        const res = await this.historyModel.create({ ...data });
        return res;
    }
    async updateById(id, data) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const update = await this.historyModel
            .findByIdAndUpdate(id, data)
            .setOptions({ overwrite: true, new: true });
        if (!update) {
            throw new common_1.NotFoundException();
        }
        return update;
    }
    async deleteById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const value = await this.historyModel.findById(id);
        return this.softRemove(value);
    }
    async softRemove(value) {
        if (value.deleteAt != null) {
            value.deleteAt = null;
        }
        else {
            value.deleteAt = new Date();
        }
        const deleted = await this.historyModel
            .findByIdAndUpdate(value.id, value)
            .setOptions({ overwrite: true, new: true });
        return deleted;
    }
};
exports.ExamHistoryService = ExamHistoryService;
exports.ExamHistoryService = ExamHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_constants_1.EXAM_HISTORY_MODEL)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object])
], ExamHistoryService);
//# sourceMappingURL=exam.history.service.js.map