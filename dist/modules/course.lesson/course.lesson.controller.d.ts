import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from 'src/models/course.lesson.model/course.lesson.model';
import { Observable } from 'rxjs';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
import { Response } from 'express';
import { CourseVideo } from 'src/models/course.video.model/course.video.model';
export declare class CourseLessonController {
    private lessonService;
    constructor(lessonService: CourseLessonService);
    getAllLessons(keyword?: string, limit?: number, skip?: number): Observable<CourseLesson[]>;
    getLessonById(id: string): Observable<CourseLesson>;
    createLesson(lesson: CreateCourseLessonDTO, res: Response): Observable<Response>;
    updateLesson(id: string, lesson: UpdateCourseLessonDTO, res: Response): Observable<Response>;
    deleteLessonById(id: string, res: Response): Observable<Response>;
    getAllLessonsOfLesson(id: string): Observable<CourseVideo[]>;
}
