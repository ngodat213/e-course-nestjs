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
const mongoose_1 = require("mongoose");
const database_constants_1 = require("../../processors/database/database.constants");
const cloudinary_constants_1 = require("../../constants/cloudinary.constants");
const helper_service_clouldinary_1 = require("../../processors/helper/helper.service.clouldinary");
let CourseService = class CourseService {
    constructor(courseModel, courseLessonModel, cloudinaryService) {
        this.courseModel = courseModel;
        this.courseLessonModel = courseLessonModel;
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
        const courses = await this.courseModel.find(query)
            .select('-__v')
            .populate('teacher', 'email username photoUrl')
            .populate('category', '_id category')
            .skip(skip)
            .limit(limit)
            .exec();
        return courses;
    }
    async findById(id) {
        const isValidId = mongoose_1.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const res = this.courseModel.findById(id)
            .select('-__v')
            .populate('teacher', 'email username photoUrl')
            .populate('category', '_id category');
        if (!res) {
            throw new common_1.NotFoundException('Course not found.');
        }
        return res;
    }
    async save(data) {
        const [fileImage, fileVideo] = data.files;
        const existing = await this.courseModel.findOne({ title: data.title });
        if (existing) {
            throw new common_1.BadRequestException('Course already exists');
        }
        try {
            const resultImage = await this.cloudinaryService.uploadFile(fileImage, cloudinary_constants_1.FILE_COURSE_THUMB, fileImage.filename, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
            const resultVideo = await this.cloudinaryService.uploadFile(fileVideo, cloudinary_constants_1.FILE_COURSE_INTRO, fileVideo.fieldname, cloudinary_constants_1.RESOURCE_TYPE_VIDEO);
            data.imagePublicId = resultImage.public_id;
            data.imageIntroduce = resultImage.url;
            data.videoIntroduce = resultVideo.public_id;
            data.videoPublicId = resultVideo.url;
            const res = await this.courseModel.create({ ...data });
            return res;
        }
        catch (err) {
            console.log(`Faill error: ${err}`);
            throw new common_1.BadRequestException(`Failed to upload image: ${err}`);
        }
    }
    async updateById(id, data) {
        try {
            const [fileImage, fileVideo] = data.files;
            const isValidId = mongoose_1.default.isValidObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter correct id.');
            }
            const findOneCourse = await this.courseModel.findById(id);
            if (!findOneCourse) {
                throw new common_1.BadRequestException(`Course is not found`);
            }
            if (fileImage) {
                this.cloudinaryService.destroyFile(findOneCourse.imagePublicId);
                const updateImage = await this.cloudinaryService.uploadFile(fileImage, cloudinary_constants_1.FILE_COURSE_THUMB, fileImage.filename, cloudinary_constants_1.RESOURCE_TYPE_IMAGE);
                data.imagePublicId = updateImage.public_id;
                data.imageIntroduce = updateImage.url;
            }
            if (fileVideo) {
                this.cloudinaryService.destroyFile(findOneCourse.videoPublicId);
                const updateVideo = await this.cloudinaryService.uploadFile(fileVideo, cloudinary_constants_1.FILE_COURSE_INTRO, fileVideo.fieldname, cloudinary_constants_1.RESOURCE_TYPE_VIDEO);
                data.videoPublicId = updateVideo.public_id;
                data.videoIntroduce = updateVideo.url;
            }
            const valueFind = await this.courseModel.findByIdAndUpdate(id, data).setOptions({ new: true });
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
            const findOne = await this.courseModel.findById(id);
            if (findOne.imagePublicId) {
                this.cloudinaryService.destroyFile(findOne.imagePublicId);
            }
            const valueFind = await this.courseModel.findByIdAndDelete({ _id: id });
            if (!valueFind) {
                throw `Course '${id}' not found`;
            }
            return valueFind;
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException(err);
        }
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
    __param(1, (0, common_1.Inject)(database_constants_1.COURSE_LESSON_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        helper_service_clouldinary_1.CloudinaryService])
], CourseService);
//# sourceMappingURL=course.service.js.map