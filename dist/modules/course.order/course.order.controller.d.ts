import { CourseOrderService } from './course.order.service';
import { CourseOrder } from './course.order.model';
import { Response } from 'express';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
export declare class CourseOrderController {
    private orderService;
    constructor(orderService: CourseOrderService);
    getAllCourseOrders(keywordUser?: string, keywordCourse?: string, limit?: number, skip?: number): Promise<CourseOrder[]>;
    getCourseOrderById(id: string): Promise<CourseOrder>;
    createCourseOrder(courseOrder: CreateCourseOrderDTO): Promise<CourseOrder>;
    updateCourseOrder(id: string, courseOrder: UpdateCourseOrderDTO, res: Response): Promise<CourseOrder>;
    deleteCourseOrderById(id: string, res: Response): Promise<CourseOrder>;
}
