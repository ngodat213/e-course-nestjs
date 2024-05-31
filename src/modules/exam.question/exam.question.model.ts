import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { ExamLessonModel } from '../exam.lesson/exam.lesson.model';

interface ExamQuestion extends Document{
    readonly question: string;
    readonly options: string[];
    readonly answer: number;
    readonly imageUrl: string;
    readonly imagePublicId: string;
    readonly lesson: Partial<ExamLessonModel>
    deleteAt: Date
}

type ExamQuestionModel = Model<ExamQuestion>;

const ExamQuestionSchema = new Schema<ExamQuestion>(
  {
    question: {type: SchemaTypes.String, required: true},
    options: [{type: SchemaTypes.String, required: true}],
    answer: {type: SchemaTypes.Number, required: true},
    imageUrl:{type: SchemaTypes.String, default: null},
    imagePublicId:{type: SchemaTypes.String, default: null},
    lesson: {type: SchemaTypes.ObjectId, ref: 'ExamLesson'},
    deleteAt:{type: SchemaTypes.Date, default: null},
  },{ timestamps: true }
);

const createExamQuestionModel: (conn: Connection) => ExamQuestionModel = (
  connection: Connection,
) => connection.model<ExamQuestion>('ExamQuestion', ExamQuestionSchema, 'ExamQuestions');

export { ExamQuestion, ExamQuestionModel, createExamQuestionModel};

