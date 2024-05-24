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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CourseOrderService } from './course.order.service';
import { CourseOrder } from './course.order.model';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
export declare class CourseOrderController {
    private orderService;
    constructor(orderService: CourseOrderService);
    getAllCourseOrders(keywordUser?: string, keywordCourse?: string, limit?: number, skip?: number): Promise<CourseOrder[]>;
    getCourseOrderById(id: string): Promise<CourseOrder>;
    createCourseOrder(courseOrder: CreateCourseOrderDTO): Promise<CourseOrder>;
    updateCourseOrder(id: string, courseOrder: UpdateCourseOrderDTO): Promise<CourseOrder>;
    deleteCourseOrderById(id: string): Promise<import("mongoose").Document<unknown, {}, CourseOrder> & CourseOrder & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
