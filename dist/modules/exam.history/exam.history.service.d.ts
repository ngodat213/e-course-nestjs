/// <reference types="mongoose/types/models" />
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
/// <reference types="mongoose/types/inferschematype" />
import mongoose, { Model } from 'mongoose';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
import { ExamQuestion } from '../exam.question/exam.question.model';
import { ExamLesson } from '../exam.lesson/exam.lesson.model';
export declare class ExamHistoryService {
    private historyModel;
    private questionModel;
    private lessonModel;
    private req;
    constructor(historyModel: Model<ExamHistory>, questionModel: Model<ExamQuestion>, lessonModel: Model<ExamLesson>, req: AuthenticatedRequest);
    findAll(keywordUser?: string, keywordExam?: string, skip?: number, limit?: number): Promise<ExamHistory[]>;
    findById(id: string): Promise<ExamHistory>;
    save(data: CreateExamHistoryDTO): Promise<mongoose.Document<unknown, {}, ExamHistory> & ExamHistory & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateById(id: string, data: UpdateExamHistoryDTO): Promise<mongoose.Document<unknown, {}, ExamHistory> & ExamHistory & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteById(id: string): Promise<ExamHistory>;
    softRemove(value: ExamHistory): Promise<mongoose.Document<unknown, {}, ExamHistory> & ExamHistory & {
        _id: mongoose.Types.ObjectId;
    }>;
}
