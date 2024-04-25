import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { ExamModel } from '../exam.model/exam.model';
import { UserModel } from '../user.model/user.model';

interface ExamHistory extends Document{
  readonly _id: string,
  readonly user: Partial<UserModel>,
  readonly exam: Partial<ExamModel>,
  readonly submitAt: Date,
  readonly point: Number,
}

type ExamHistoryModel = Model<ExamHistory>;

const ExamHistorySchema = new Schema<ExamHistory>(
  {
    _id: SchemaTypes.ObjectId,
    user:{ type: SchemaTypes.ObjectId, ref: 'User' },
    exam:{ type: SchemaTypes.ObjectId, ref: 'Exam' },
    submitAt: {type: SchemaTypes.Date, required: true},
    point: {type: SchemaTypes.Number, required: true},
  },{ timestamps: true }
);

const createExamHistoryModel: (conn: Connection) => ExamHistoryModel = (
  connection: Connection,
) => connection.model<ExamHistory>('ExamHistory', ExamHistorySchema, 'ExamHistorys');

export {ExamHistory, ExamHistoryModel, createExamHistoryModel};