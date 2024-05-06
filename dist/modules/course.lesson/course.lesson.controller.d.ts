import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { Observable } from 'rxjs';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
import { Response } from 'express';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
export declare class CourseLessonController {
    private lessonService;
    constructor(lessonService: CourseLessonService);
    getAllCourseLessons(keyword?: string, limit?: number, skip?: number): Promise<CourseLesson[]>;
    getCourseLessonById(id: string): Promise<CourseLesson>;
    createCourseLesson(lesson: CreateCourseLessonDTO): Promise<CourseLesson>;
    updateCourseLesson(id: string, lesson: UpdateCourseLessonDTO): Promise<CourseLesson>;
    deleteLessonById(id: string, res: Response): Observable<Response>;
    getAllLessonsOfCourse(id: string): Promise<CourseVideo[]>;
}
