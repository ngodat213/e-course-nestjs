import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { ExamLessonModel } from '../exam.lesson/exam.lesson.model';

interface ExamQuestion extends Document{
    readonly question: string;
    readonly options: string[];
    readonly answer: number;
    readonly imageUrl: string;
    readonly imagePublicId: string;
    readonly lesson: Partial<ExamLessonModel>
}

type ExamQuestionModel = Model<ExamQuestion>;

const ExamQuestionSchema = new Schema<ExamQuestion>(
  {
    question: {type: SchemaTypes.String, required: true},
    options: [{type: SchemaTypes.String, required: true}],
    answer: {type: SchemaTypes.Number, required: true},
    imageUrl:{type: SchemaTypes.String, required: true},
    imagePublicId:{type: SchemaTypes.String, required: true},
    lesson: {type: SchemaTypes.ObjectId, ref: 'ExamLesson'},
  },{ timestamps: true }
);

const createExamQuestionModel: (conn: Connection) => ExamQuestionModel = (
  connection: Connection,
) => connection.model<ExamQuestion>('ExamQuestion', ExamQuestionSchema, 'ExamQuestions');

export { ExamQuestion, ExamQuestionModel, createExamQuestionModel};

