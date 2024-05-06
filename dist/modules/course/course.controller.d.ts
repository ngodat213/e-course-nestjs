import { Response } from 'express';
import { CourseService } from './course.service';
import { Course } from 'src/modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from '../course.lesson/course.lesson.model';
export declare class CourseController {
    private courseService;
    constructor(courseService: CourseService);
    getAllCourses(keyword?: string, limit?: number, skip?: number): Promise<Course[]>;
    getCourseById(id: string): Promise<Course>;
    createCourse(course: CreateCourseDTO): Promise<Course>;
    updateCourse(id: string, course: UpdateCourseDTO, res: Response): Promise<Course>;
    deleteCourseById(id: string): Promise<Course>;
    getAllLessonsOfCourse(id: string): Promise<CourseLesson[]>;
}
