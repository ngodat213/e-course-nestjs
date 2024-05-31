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
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../processors/database/database.constants");
const cloudinary_constants_1 = require("../../constants/cloudinary.constants");
const helper_service_clouldinary_1 = require("../../processors/helper/helper.service.clouldinary");
let ExamQuestionService = class ExamQuestionService {
    constructor(questionModel, cloudinaryService) {
        this.questionModel = questionModel;
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
        try {
            if (fileImage) {
                const resultImage = await this.cloudinaryService.uploadFile(data.file, cloudinary_constants_1.FILE_EXAM_QUESTION, fileImage.fieldname, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
                data.imageUrl = resultImage.url;
                data.imagePublicId = resultImage.public_id;
            }
            const res = await this.questionModel.create({ ...data });
            return res;
        }
        catch (err) {
            console.log(`Faill error: ${err}`);
            throw new common_1.BadRequestException(`Fail error: ${err}`);
        }
    }
    async updateById(id, data) {
        try {
            const fileImage = data.file;
            const isValidId = mongoose_1.default.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter correct id.');
            }
            const findOneQuestion = await this.questionModel.findById(id);
            if (!findOneQuestion) {
                throw new common_1.BadRequestException(`Question is not found`);
            }
            if (fileImage) {
                this.cloudinaryService.destroyFile(findOneQuestion.imagePublicId);
                const updateImage = await this.cloudinaryService.uploadFile(fileImage, cloudinary_constants_1.FILE_EXAM_QUESTION, fileImage.filename, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
                data.imagePublicId = updateImage.public_id;
                data.imageUrl = updateImage.url;
            }
            const valueFind = await this.questionModel.findByIdAndUpdate(id, data).setOptions({ new: true });
            if (!valueFind) {
                throw new common_1.NotFoundException();
            }
            console.log(valueFind);
            return valueFind;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException(err);
        }
    }
    async deleteById(id) {
        try {
            const isValidId = mongoose_1.default.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter correct id.');
            }
            const value = await this.questionModel.findById(id);
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
        const deleted = await this.questionModel
            .findByIdAndUpdate(value.id, value)
            .setOptions({ overwrite: true, new: true });
        return deleted;
    }
};
exports.ExamQuestionService = ExamQuestionService;
exports.ExamQuestionService = ExamQuestionService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.EXAM_QUESTION_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        helper_service_clouldinary_1.CloudinaryService])
], ExamQuestionService);
//# sourceMappingURL=exam.question.service.js.map