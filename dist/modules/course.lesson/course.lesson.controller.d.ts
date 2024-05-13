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
import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
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
    deleteLessonById(id: string, res: Response): Promise<import("mongoose").Document<unknown, {}, CourseLesson> & CourseLesson & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllLessonsOfCourse(id: string): Promise<CourseVideo[]>;
}
