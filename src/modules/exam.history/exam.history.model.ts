import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { ExamModel } from '../exam/exam.model';
import { UserModel } from '../user/user.model';
import { ExamLessonModel } from '../exam.lesson/exam.lesson.model';

interface ExamHistory extends Document{
  readonly user: Partial<UserModel>,
  readonly lesson: Partial<ExamLessonModel>,
  readonly point: Number,
  readonly correct: Number,
  readonly incorrect: Number,
  deleteAt: Date
}

type ExamHistoryModel = Model<ExamHistory>;

const ExamHistorySchema = new Schema<ExamHistory>(
  {
    user:{ type: SchemaTypes.ObjectId, ref: 'User' },
    lesson:{ type: SchemaTypes.ObjectId, ref: 'ExamLesson' },
    point: {type: SchemaTypes.Number, required: true},
    correct: {type: SchemaTypes.Number, required: true},
    incorrect: {type: SchemaTypes.Number, required: true},
    deleteAt:{type: SchemaTypes.Date, default: null},
  },{ timestamps: true }
);

const createExamHistoryModel: (conn: Connection) => ExamHistoryModel = (
  connection: Connection,
) => connection.model<ExamHistory>('ExamHistory', ExamHistorySchema, 'ExamHistorys');

export {ExamHistory, ExamHistoryModel, createExamHistoryModel};