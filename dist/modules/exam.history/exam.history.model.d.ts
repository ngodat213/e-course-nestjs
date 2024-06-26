/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/connection" />
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
import { Connection, Document, Model } from 'mongoose';
import { UserModel } from '../user/user.model';
import { ExamLessonModel } from '../exam.lesson/exam.lesson.model';
import { ExamSubmit } from './exam.history.dto';
interface ExamHistory extends Document {
    readonly user: Partial<UserModel>;
    readonly lesson: Partial<ExamLessonModel>;
    readonly point: Number;
    readonly correct: Partial<ExamLessonModel>;
    readonly examSubmit: Partial<ExamSubmit>[];
    readonly questions: Partial<ExamLessonModel>;
    deleteAt: Date;
}
type ExamHistoryModel = Model<ExamHistory>;
declare const createExamHistoryModel: (conn: Connection) => ExamHistoryModel;
export { ExamHistory, ExamHistoryModel, createExamHistoryModel };
