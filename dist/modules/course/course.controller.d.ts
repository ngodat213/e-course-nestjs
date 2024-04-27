import { Response } from 'express';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';
import { Course } from 'src/modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    getAllCourses(keyword?: string, limit?: number, skip?: number): Observable<Course[]>;
    getCourseById(id: string): Observable<Course>;
    createCourse(course: CreateCourseDTO, res: Response): Observable<Response>;
    updateCourse(id: string, course: UpdateCourseDTO, res: Response): Observable<Response>;
    deleteCourseById(id: string, res: Response): Observable<Response>;
    getAllLessonsOfCourse(id: string): Observable<CourseLesson[]>;
}
