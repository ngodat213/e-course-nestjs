import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { ExamLesson } from '../exam.lesson.model/exam.lesson.model';

interface ExamQuestion extends Document{
    readonly _id: string;
    readonly question: string;
    readonly options: [{string}];
    readonly answer: number;
    readonly imageUrl: string;
    readonly lesson: Partial<ExamLesson>
}

type ExamQuestionModel = Model<ExamQuestion>;

const ExamQuestionSchema = new Schema<ExamQuestion>(
  {
    _id: SchemaTypes.ObjectId,
    question: {type: SchemaTypes.String, required: true},
    options: [{type: SchemaTypes.String, required: true}],
    answer: {type: SchemaTypes.Number, required: true},
    imageUrl:{type: SchemaTypes.String, required: true},
    lesson: {type: SchemaTypes.ObjectId, ref: 'ExamLesson'},
  }
);

const createExamQuestionModel: (conn: Connection) => ExamQuestionModel = (
  connection: Connection,
) => connection.model<ExamQuestion>('ExamQuestion', ExamQuestionSchema, 'ExamQuestions');

export { ExamQuestion, ExamQuestionModel, createExamQuestionModel};

