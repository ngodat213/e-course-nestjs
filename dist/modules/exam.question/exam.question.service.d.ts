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
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';
export declare class ExamQuestionService {
    private questionModel;
    private readonly cloudinaryService;
    constructor(questionModel: Model<ExamQuestion>, cloudinaryService: CloudinaryService);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<ExamQuestion[]>;
    findById(id: string): Promise<ExamQuestion>;
    save(data: CreateExamQuestionDTO): Promise<ExamQuestion>;
    updateById(id: string, data: UpdateExamQuestionDTO): Promise<mongoose.Document<unknown, {}, ExamQuestion> & ExamQuestion & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, ExamQuestion> & ExamQuestion & {
        _id: mongoose.Types.ObjectId;
    }>;
    softRemove(value: ExamQuestion): Promise<mongoose.Document<unknown, {}, ExamQuestion> & ExamQuestion & {
        _id: mongoose.Types.ObjectId;
    }>;
}
