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
import { ExamQuestionService } from './exam.question.service';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';
export declare class ExamQuestionController {
    private questionService;
    constructor(questionService: ExamQuestionService);
    getAllExams(keyword?: string, limit?: number, skip?: number): Promise<ExamQuestion[]>;
    getExamById(id: string): Promise<ExamQuestion>;
    createExam(exam: CreateExamQuestionDTO): Promise<ExamQuestion>;
    updateExam(id: string, exam: UpdateExamQuestionDTO): Promise<import("mongoose").Document<unknown, {}, ExamQuestion> & ExamQuestion & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteQuestionById(id: string): Promise<import("mongoose").Document<unknown, {}, ExamQuestion> & ExamQuestion & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
