import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { ExamLessonModel } from '../exam.lesson.model/exam.lesson.model';

interface Exam extends Document{
  readonly _id: string,
  readonly title: string,
  readonly description: string,
  readonly category: string,
  readonly imageUrl:  string,
  readonly lessons: Partial<ExamLessonModel>
}

type ExamModel = Model<Exam>;

const ExamSchema = new Schema<Exam>(
  {
    _id: SchemaTypes.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
    lessons:{ type: [{ type: SchemaTypes.ObjectId, ref: 'QuizLesson' }] },
  }
);

const createExamModel: (conn: Connection) => ExamModel = (
  connection: Connection,
) => connection.model<Exam>('Exam', ExamSchema, 'Exams');

export {Exam, ExamModel, createExamModel};