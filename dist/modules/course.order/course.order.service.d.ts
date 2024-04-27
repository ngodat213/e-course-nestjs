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
import { CourseOrder } from './course.order.model';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
import { IService } from 'src/interfaces/service.interface';
export declare class CourseOrderService implements IService<CourseOrder> {
    private orderModel;
    private req;
    constructor(orderModel: Model<CourseOrder>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Observable<CourseOrder[]>;
    findById(id: string): Observable<CourseOrder>;
    save(data: CreateCourseOrderDTO): Observable<CourseOrder>;
    update(id: string, data: UpdateCourseOrderDTO): Observable<CourseOrder>;
    deleteAll(): Observable<any>;
    deleteById(id: string): Observable<CourseOrder>;
}
