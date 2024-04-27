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
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { Model } from 'mongoose';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { IService } from 'src/interfaces/service.interface';
export declare class CourseVideoService implements IService<CourseVideo> {
    private videoModel;
    private req;
    constructor(videoModel: Model<CourseVideo>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Observable<CourseVideo[]>;
    findById(id: string): Observable<CourseVideo>;
    save(data: CreateCourseVideoDTO): Observable<CourseVideo>;
    update(id: string, data: UpdateCourseVideoDTO): Observable<CourseVideo>;
    deleteAll(): Observable<any>;
    deleteById(id: string): Observable<CourseVideo>;
}
