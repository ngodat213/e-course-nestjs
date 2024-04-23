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
import { ExamQuestionModel } from '../exam.question.model/exam.question.model';
interface ExamLesson extends Document {
    readonly _id: string;
    readonly title: string;
    readonly hour: Number;
    readonly minute: Number;
    readonly second: Number;
    readonly selection: Number;
    readonly point: Number;
    readonly questions: Partial<ExamQuestionModel>;
}
type ExamLessonModel = Model<ExamLesson>;
declare const createExamLessonModel: (conn: Connection) => ExamLessonModel;
export { ExamLesson, ExamLessonModel, createExamLessonModel };