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
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamLessonService } from './exam.lesson.service';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
export declare class ExamLessonController {
    private lessonService;
    constructor(lessonService: ExamLessonService);
    getAllCourseLessons(keyword?: string, limit?: number, skip?: number): Promise<ExamLesson[]>;
    getCourseLessonById(id: string): Promise<ExamLesson>;
    createCourseLesson(lesson: CreateExamLessonDTO): Promise<ExamLesson>;
    updateCourseLesson(id: string, lesson: UpdateExamLessonDTO): Promise<ExamLesson>;
    deleteLessonById(id: string): Promise<import("mongoose").Document<unknown, {}, ExamLesson> & ExamLesson & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllExamOfLesson(id: string): Promise<ExamQuestion[]>;
}
