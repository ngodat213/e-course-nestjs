import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
export declare class CourseLessonController {
    private lessonService;
    constructor(lessonService: CourseLessonService);
    getAllCourseLessons(keyword?: string, limit?: number, skip?: number): Promise<CourseLesson[]>;
    getCourseLessonById(id: string): Promise<CourseLesson>;
    createCourseLesson(lesson: CreateCourseLessonDTO): Promise<CourseLesson>;
    updateCourseLesson(id: string, lesson: UpdateCourseLessonDTO): Promise<CourseLesson>;
    deleteCourseLessonById(id: string): Promise<CourseLesson>;
    getAllLessonsOfCourse(id: string): Promise<CourseVideo[]>;
}
