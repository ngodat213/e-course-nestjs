import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { ExamModel } from '../exam.model/exam.model';

interface ExamLesson extends Document{
  readonly title: string,
  readonly hour: Number,
  readonly minute: Number,
  readonly second: Number,
  readonly selection: Number,
  readonly point: Number,
  readonly exam: Partial<ExamModel>,
}

type ExamLessonModel = Model<ExamLesson>;

const ExamLessonSchema = new Schema<ExamLesson>(
  {
    title: {type: SchemaTypes.String, required: true},
    hour: {type: SchemaTypes.Number, required: true},
    minute: {type: SchemaTypes.Number, required: true},
    second: {type: SchemaTypes.Number, required: true},
    selection: {type: SchemaTypes.Number, required: true},
    point: {type: SchemaTypes.Number, required: true},
    exam:{ type: SchemaTypes.ObjectId, ref: 'Exam' },
  },{ timestamps: true }
);

const createExamLessonModel: (conn: Connection) => ExamLessonModel = (
  connection: Connection,
) => connection.model<ExamLesson>('ExamLesson', ExamLessonSchema, 'ExamLesson');

export { ExamLesson , ExamLessonModel, createExamLessonModel };

