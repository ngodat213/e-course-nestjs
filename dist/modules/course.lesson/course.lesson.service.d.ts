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
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
export declare class CourseLessonService {
    private lessonModel;
    private videoModel;
    private req;
    constructor(lessonModel: Model<CourseLesson>, videoModel: Model<CourseVideo>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<CourseLesson[]>;
    findById(id: string): Promise<CourseLesson>;
    save(data: CreateCourseLessonDTO): Promise<CourseLesson>;
    updateById(id: string, data: UpdateCourseLessonDTO): Promise<mongoose.Document<unknown, {}, CourseLesson> & CourseLesson & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, CourseLesson> & CourseLesson & {
        _id: mongoose.Types.ObjectId;
    }>;
    softRemove(value: CourseLesson): Promise<mongoose.Document<unknown, {}, CourseLesson> & CourseLesson & {
        _id: mongoose.Types.ObjectId;
    }>;
    videosOf(id: string): Promise<CourseVideo[]>;
}
