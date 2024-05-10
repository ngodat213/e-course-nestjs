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
exports.ExamQuestionService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const rxjs_1 = require("rxjs");
const database_constants_1 = require("../../processors/database/database.constants");
const cloudinary_constants_1 = require("../../constants/cloudinary.constants");
const helper_clouldinary_1 = require("../../processors/helper/helper.clouldinary");
let ExamQuestionService = class ExamQuestionService {
    constructor(questionModel, req, cloudinaryService) {
        this.questionModel = questionModel;
        this.req = req;
        this.cloudinaryService = cloudinaryService;
    }
    async findAll(keyword, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = keyword ?
            { question: { $regex: keyword, $options: 'i' } } : {};
        return this.questionModel.find({ ...query }).select('-__v').skip(skip).limit(limit).exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.questionModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Question not found.');
        }
        return res;
    }
    async save(data) {
        const fileImage = data.file;
        const existing = await this.questionModel.findOne({ question: data.question });
        if (existing) {
            throw new common_1.BadRequestException('Question already exists');
        }
        try {
            const resultImage = await this.cloudinaryService.uploadFile(data.file, cloudinary_constants_1.FILE_EXAM_QUESTION, fileImage.fieldname, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
            data.imageUrl = resultImage.url;
            data.imagePublicId = resultImage.public_id;
            const res = await this.questionModel.create({ ...data });
            return res;
        }
        catch (err) {
            console.log(`Faill error: ${err}`);
            throw new Error(`Failed to upload image: ${err}`);
        }
    }
    async updateById(id, data) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const updated = await this.questionModel
            .findByIdAndUpdate(id, data)
            .setOptions({ overwrite: true, new: true });
        if (!updated) {
            throw new common_1.NotFoundException();
        }
        return updated;
    }
    deleteById(id) {
        return (0, rxjs_1.from)(this.questionModel.findOneAndDelete({ _id: id }).exec()).pipe((0, rxjs_1.mergeMap)((p) => (p ? (0, rxjs_1.of)(p) : rxjs_1.EMPTY)), (0, rxjs_1.throwIfEmpty)(() => new common_1.NotFoundException(`question: $id was not found`)));
    }
};
exports.ExamQuestionService = ExamQuestionService;
exports.ExamQuestionService = ExamQuestionService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.EXAM_QUESTION_MODEL)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object, helper_clouldinary_1.CloudinaryService])
], ExamQuestionService);
//# sourceMappingURL=exam.question.service.js.map