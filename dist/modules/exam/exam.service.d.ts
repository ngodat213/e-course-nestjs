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
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/models/exam.lesson.model/exam.lesson.model';
import { Exam } from 'src/models/exam.model/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
export declare class ExamService {
    private examModel;
    private lessonModel;
    private req;
    constructor(examModel: Model<Exam>, lessonModel: Model<ExamLesson>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Observable<Exam[]>;
    findById(id: string): Observable<Exam>;
    save(data: CreateExamDTO): Observable<Exam>;
    update(id: string, data: UpdateExamDTO): Observable<Exam>;
    deleteAll(): Observable<any>;
    deleteById(id: string): Observable<Exam>;
    lessonsOf(id: string): Observable<ExamLesson[]>;
}
