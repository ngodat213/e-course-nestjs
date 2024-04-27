import { CourseOrderService } from './course.order.service';
import { CourseOrder } from './course.order.model';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
export declare class CourseOrderController {
    private orderService;
    constructor(orderService: CourseOrderService);
    getAllCourseOrders(keyword?: string, limit?: number, skip?: number): Observable<CourseOrder[]>;
    getCourseOrderById(id: string): Observable<CourseOrder>;
    createCourseOrder(courseOrder: CreateCourseOrderDTO, res: Response): Observable<Response>;
    updateCourseOrder(id: string, courseOrder: UpdateCourseOrderDTO, res: Response): Observable<Response>;
    deleteCourseOrderById(id: string, res: Response): Observable<Response>;
}
