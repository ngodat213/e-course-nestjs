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
exports.CourseVideoService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const database_constants_1 = require("../../processors/database/database.constants");
const mongoose_1 = require("mongoose");
const cloudinary_constants_1 = require("../../constants/cloudinary.constants");
const helper_service_clouldinary_1 = require("../../processors/helper/helper.service.clouldinary");
let CourseVideoService = class CourseVideoService {
    constructor(videoModel, req, cloudinaryService) {
        this.videoModel = videoModel;
        this.req = req;
        this.cloudinaryService = cloudinaryService;
    }
    async findAll(keyword, skip = 0, limit = 10) {
        if (keyword && keyword.trim() === '') {
            throw new common_1.BadRequestException('Do not enter spaces.');
        }
        const query = keyword ?
            { title: { $regex: keyword, $options: 'i' } } : {};
        return this.videoModel.find({ ...query }).select('-__v').skip(skip).limit(limit).exec();
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.videoModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Course not found.');
        }
        return res;
    }
    async save(data) {
        const fileVideo = data.file;
        const existing = await this.videoModel.findOne({ title: data.title });
        if (existing) {
            throw new common_1.BadRequestException('Course already exists');
        }
        try {
            const resultVideo = await this.cloudinaryService.uploadFile(data.file, cloudinary_constants_1.FILE_COURSE_INTRO, fileVideo.fieldname, cloudinary_constants_1.RESOURCE_TYPE_VIDEO);
            data.videoUrl = resultVideo.url;
            data.videoPublicId = resultVideo.public_id;
            const res = await this.videoModel.create({ ...data });
            return res;
        }
        catch (err) {
            console.log(`Faill error: ${err}`);
            throw new common_1.BadRequestException(`Failed to upload image: ${err}`);
        }
    }
    async updateById(id, data) {
        try {
            const fileVideo = data.file;
            const isValidId = mongoose_1.default.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter correct id.');
            }
            const findOneVideo = await this.videoModel.findById(id);
            if (!findOneVideo) {
                throw new common_1.BadRequestException(`Course video is not found`);
            }
            if (fileVideo) {
                this.cloudinaryService.destroyFile(findOneVideo.videoPublicId);
                const updateVideo = await this.cloudinaryService.uploadFile(fileVideo, cloudinary_constants_1.FILE_COURSE_VIDEO, fileVideo.fieldname, cloudinary_constants_1.RESOURCE_TYPE_VIDEO);
                data.videoPublicId = updateVideo.public_id;
                data.videoUrl = updateVideo.url;
            }
            const valueFind = await this.videoModel.findByIdAndUpdate(id, data, { new: true });
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
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const valueFind = await this.videoModel.findByIdAndDelete({ _id: id });
        if (!valueFind) {
            throw `Course video '${id}' not found`;
        }
        return valueFind;
    }
};
exports.CourseVideoService = CourseVideoService;
exports.CourseVideoService = CourseVideoService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(database_constants_1.COURSE_VIDEO_MODEL)),
    __param(1, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_1.Model, Object, helper_service_clouldinary_1.CloudinaryService])
], CourseVideoService);
//# sourceMappingURL=course.video.service.js.map