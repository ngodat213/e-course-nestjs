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
import { ExamService } from './exam.service';
import { Exam } from 'src/modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
export declare class ExamController {
    private examService;
    constructor(examService: ExamService);
    getAllExams(keyword?: string, category?: string, limit?: number, skip?: number): Promise<Exam[]>;
    getExamById(id: string): Promise<Exam>;
    createExam(exam: CreateExamDTO): Promise<Exam>;
    updateExam(id: string, exam: UpdateExamDTO): Promise<import("mongoose").Document<unknown, {}, Exam> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteExamById(id: string): Promise<import("mongoose").Document<unknown, {}, Exam> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllLessonsOfExam(id: string): Promise<ExamLesson[]>;
}
