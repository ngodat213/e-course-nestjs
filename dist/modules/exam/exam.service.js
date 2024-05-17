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
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../processors/database/database.constants");
const cloudinary_constants_1 = require("../../constants/cloudinary.constants");
const helper_service_clouldinary_1 = require("../../processors/helper/helper.service.clouldinary");
let ExamService = class ExamService {
    constructor(examModel, lessonModel, req, cloudinaryService) {
        this.examModel = examModel;
        this.lessonModel = lessonModel;
        this.req = req;
        this.cloudinaryService = cloudinaryService;
    }
    async findAll(keyword, category, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = {};
        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        return this.examModel.find(query)
            .select('-__v')
            .populate('category', '_id category')
            .skip(skip)
            .limit(limit)
            .exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.examModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Exam not found.');
        }
        return res;
    }
    async save(data) {
        const fileImage = data.file;
        const existing = await this.examModel.findOne({ title: data.title });
        if (existing) {
            throw new common_1.BadRequestException('Exam already exists');
        }
        try {
            const resultImage = await this.cloudinaryService.uploadFile(fileImage, cloudinary_constants_1.FILE_COURSE_INTRO, fileImage.fieldname, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
            data.imageUrl = resultImage.url;
            data.imagePublicId = resultImage.public_id;
            const res = await this.examModel.create({ ...data });
            return res;
        }
        catch (err) {
            console.log(`Faill error: ${err}`);
            throw new common_1.BadRequestException(`Failed to upload image: ${err}`);
        }
    }
    async updateById(id, data) {
        try {
            const fileImage = data.file;
            const isValidId = mongoose_1.default.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter correct id.');
            }
            const findOneExam = await this.examModel.findById(id);
            if (!findOneExam) {
                throw new common_1.BadRequestException(`Exam is not found`);
            }
            if (fileImage) {
                this.cloudinaryService.destroyFile(findOneExam.imagePublicId);
                const updateImage = await this.cloudinaryService.uploadFile(fileImage, cloudinary_constants_1.FILE_EXAM_THUMB, fileImage.filename, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
                data.imagePublicId = updateImage.public_id;
                data.imageUrl = updateImage.url;
            }
            const valueFind = await this.examModel.findByIdAndUpdate(id, data).setOptions({ new: true });
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
    deleteAll() {
        return this.examModel.deleteMany({}).exec();
    }
    async deleteById(id) {
        try {
            const isValidId = mongoose_1.default.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter correct id.');
            }
            const findOne = await this.examModel.findById(id);
            if (findOne.imagePublicId) {
                this.cloudinaryService.destroyFile(findOne.imagePublicId);
            }
            const valueFind = await this.examModel.findByIdAndDelete({ _id: id });
            if (!valueFind) {
                throw `Exam '${id}' not found`;
            }
            return valueFind;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException(err);
        }
    }
    lessonsOf(id) {
        const lessons = this.lessonModel
            .find({
            exam: { _id: id },
        })
            .select('-exam')
            .exec();
        return lessons;
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.EXAM_MODEL)),
    __param(1, (0, common_1.Inject)(database_constants_1.EXAM_LESSON_MODEL)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model, Object, helper_service_clouldinary_1.CloudinaryService])
], ExamService);
//# sourceMappingURL=exam.service.js.map