import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { ExamModel } from '../exam/exam.model';
import { UserModel } from '../user/user.model';

interface ExamHistory extends Document{
  readonly user: Partial<UserModel>,
  readonly exam: Partial<ExamModel>,
  readonly point: Number,
}

type ExamHistoryModel = Model<ExamHistory>;

const ExamHistorySchema = new Schema<ExamHistory>(
  {
    user:{ type: SchemaTypes.ObjectId, ref: 'User' },
    exam:{ type: SchemaTypes.ObjectId, ref: 'Exam' },
    point: {type: SchemaTypes.Number, required: true},
  },{ timestamps: true }
);

const createExamHistoryModel: (conn: Connection) => ExamHistoryModel = (
  connection: Connection,
) => connection.model<ExamHistory>('ExamHistory', ExamHistorySchema, 'ExamHistorys');

export {ExamHistory, ExamHistoryModel, createExamHistoryModel};