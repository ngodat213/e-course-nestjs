import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { UserModel } from '../user/user.model';
import { ExamLessonModel } from '../exam.lesson/exam.lesson.model';
import { ExamSubmit } from './exam.history.dto';

interface ExamHistory extends Document{
  readonly user: Partial<UserModel>,
  readonly lesson: Partial<ExamLessonModel>,
  readonly point: Number,
  readonly correct: Partial<ExamLessonModel>,
  readonly examSubmit: Partial<ExamSubmit>[],
  readonly questions: Partial<ExamLessonModel>,
  deleteAt: Date
}

type ExamHistoryModel = Model<ExamHistory>;

const ExamSubmitSchema = new Schema(
  {
    id: { type: SchemaTypes.ObjectId, required: true, ref: 'ExamQuestion' },
    answer: { type: SchemaTypes.Number, required: true }
  },
  { _id: false }
);

const ExamHistorySchema = new Schema<ExamHistory>(
  {
    user:{ type: SchemaTypes.ObjectId, ref: 'User' },
    lesson:{ type: SchemaTypes.ObjectId, ref: 'ExamLesson' },
    point: {type: SchemaTypes.Number, required: true},
    correct: { type: [{type: SchemaTypes.ObjectId, ref: 'ExamQuestion'}]},
    questions: { type: [{type: SchemaTypes.ObjectId, ref: 'ExamQuestion'}]},
    examSubmit: { type: [ExamSubmitSchema], required: true },
    deleteAt:{type: SchemaTypes.Date, default: null},
  },{ timestamps: true }
);

const createExamHistoryModel: (conn: Connection) => ExamHistoryModel = (
  connection: Connection,
) => connection.model<ExamHistory>('ExamHistory', ExamHistorySchema, 'ExamHistorys');

export {ExamHistory, ExamHistoryModel, createExamHistoryModel};