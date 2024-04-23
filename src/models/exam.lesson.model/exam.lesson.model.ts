import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { ExamQuestionModel } from '../exam.question.model/exam.question.model';

interface ExamLesson extends Document{
  readonly _id: string,
  readonly title: string,
  readonly hour: Number,
  readonly minute: Number,
  readonly second: Number,
  readonly selection: Number,
  readonly point: Number,
  readonly questions: Partial<ExamQuestionModel>,
}

type ExamLessonModel = Model<ExamLesson>;

const ExamLessonSchema = new Schema<ExamLesson>(
  {
    _id: SchemaTypes.ObjectId,
    title: {type: SchemaTypes.String, required: true},
    hour: {type: SchemaTypes.Number, required: true},
    minute: {type: SchemaTypes.Number, required: true},
    second: {type: SchemaTypes.Number, required: true},
    selection: {type: SchemaTypes.Number, required: true},
    point: {type: SchemaTypes.Number, required: true},
    questions:{ type: [{ type: SchemaTypes.ObjectId, ref: 'ExamQuestion' }] },
  }
);

const createExamLessonModel: (conn: Connection) => ExamLessonModel = (
  connection: Connection,
) => connection.model<ExamLesson>('ExamLesson', ExamLessonSchema, 'ExamLesson');

export { ExamLesson , ExamLessonModel, createExamLessonModel };

