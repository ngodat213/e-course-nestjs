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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
export declare class ExamLessonService {
    private lessonModel;
    private questionModel;
    private req;
    constructor(lessonModel: Model<ExamLesson>, questionModel: Model<ExamQuestion>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<ExamLesson[]>;
    findById(id: string): Promise<ExamLesson>;
    save(data: CreateExamLessonDTO): Promise<ExamLesson>;
    updateById(id: string, examLesson: UpdateExamLessonDTO): Promise<ExamLesson>;
    deleteById(id: string): Promise<ExamLesson>;
    lessonsOf(id: string): Promise<ExamQuestion[]>;
}
