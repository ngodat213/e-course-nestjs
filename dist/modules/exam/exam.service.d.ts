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
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { Exam } from 'src/modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';
export declare class ExamService {
    private examModel;
    private lessonModel;
    private req;
    private readonly cloudinaryService;
    constructor(examModel: Model<Exam>, lessonModel: Model<ExamLesson>, req: AuthenticatedRequest, cloudinaryService: CloudinaryService);
    findAll(keyword?: string, category?: string, skip?: number, limit?: number): Promise<Exam[]>;
    findById(id: string): Promise<Exam>;
    save(data: CreateExamDTO): Promise<Exam>;
    updateById(id: string, data: UpdateExamDTO): Promise<mongoose.Document<unknown, {}, Exam> & Exam & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteAll(): Promise<any>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, Exam> & Exam & {
        _id: mongoose.Types.ObjectId;
    }>;
    softRemove(value: Exam): Promise<mongoose.Document<unknown, {}, Exam> & Exam & {
        _id: mongoose.Types.ObjectId;
    }>;
    lessonsOf(id: string): Promise<ExamLesson[]>;
}
