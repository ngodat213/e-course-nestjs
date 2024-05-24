/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Model } from 'mongoose';
import { Course } from 'src/modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';
export declare class CourseService {
    private courseModel;
    private courseLessonModel;
    private readonly cloudinaryService;
    constructor(courseModel: Model<Course>, courseLessonModel: Model<CourseLesson>, cloudinaryService: CloudinaryService);
    findAll(keyword?: string, category?: string, skip?: number, limit?: number): Promise<Course[]>;
    findById(id: string): Promise<Course>;
    save(data: CreateCourseDTO): Promise<Course>;
    updateById(id: string, data: UpdateCourseDTO): Promise<mongoose.Document<unknown, {}, Course> & Course & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, Course> & Course & {
        _id: mongoose.Types.ObjectId;
    }>;
    softRemove(value: Course): Promise<mongoose.Document<unknown, {}, Course> & Course & {
        _id: mongoose.Types.ObjectId;
    }>;
    lessonsOf(id: string): Promise<CourseLesson[]>;
}
