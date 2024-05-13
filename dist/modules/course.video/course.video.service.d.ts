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
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import mongoose, { Model } from 'mongoose';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';
export declare class CourseVideoService {
    private videoModel;
    private req;
    private readonly cloudinaryService;
    constructor(videoModel: Model<CourseVideo>, req: AuthenticatedRequest, cloudinaryService: CloudinaryService);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<CourseVideo[]>;
    findById(id: string): Promise<CourseVideo>;
    save(data: CreateCourseVideoDTO): Promise<CourseVideo>;
    updateById(id: string, data: UpdateCourseVideoDTO): Promise<mongoose.Document<unknown, {}, CourseVideo> & CourseVideo & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteById(id: string): Promise<CourseVideo>;
}
