import { Response } from 'express';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';
import { Course } from 'src/modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from '../course.lesson/course.lesson.model';
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    getAllCourses(keyword?: string, limit?: number, skip?: number): Promise<Course[]>;
    getCourseById(id: string): Promise<Course>;
    createCourse(body: CreateCourseDTO): Promise<Course>;
    updateCourse(id: string, course: UpdateCourseDTO, res: Response): Promise<Course>;
    deleteCourseById(id: string, res: Response): Observable<Response>;
    getAllLessonsOfCourse(id: string): Promise<CourseLesson[]>;
}
