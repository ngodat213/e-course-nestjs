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
import { Feedback } from 'src/modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
import { Course } from '../course/course.model';
export declare class FeedbackService {
    private feedbackModel;
    private courseModel;
    private req;
    constructor(feedbackModel: Model<Feedback>, courseModel: Model<Course>, req: AuthenticatedRequest);
    findAll(keywordUser?: string, keywordCourse?: string, skip?: number, limit?: number): Promise<Feedback[]>;
    findById(id: string): Promise<Feedback>;
    save(data: CreateFeedbackDTO): Promise<Feedback>;
    updateById(id: string, data: UpdateFeedbackDTO): Promise<mongoose.Document<unknown, {}, Feedback> & Feedback & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteById(id: string): Promise<mongoose.Document<unknown, {}, Feedback> & Feedback & {
        _id: mongoose.Types.ObjectId;
    }>;
    softRemove(value: Feedback): Promise<mongoose.Document<unknown, {}, Feedback> & Feedback & {
        _id: mongoose.Types.ObjectId;
    }>;
}
