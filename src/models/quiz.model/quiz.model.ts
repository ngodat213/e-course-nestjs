import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { QuizLessonModel } from '../quiz.lesson.model/quiz.lesson.model';

interface Quiz extends Document{
  readonly _id: string,
  readonly title: string,
  readonly description: string,
  readonly category: string,
  readonly imageUrl:  string,
  readonly lessons: Partial<QuizLessonModel>
}

type QuizModel = Model<Quiz>;

const QuizSchema = new Schema<Quiz>(
  {
    _id: SchemaTypes.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
    lessons:{ type: [{ type: SchemaTypes.ObjectId, ref: 'QuizLesson' }] },
  }
);

const createQuizModel: (conn: Connection) => QuizModel = (
  connection: Connection,
) => connection.model<Quiz>('Quiz', QuizSchema, 'Quizs');

export {Quiz, QuizModel, createQuizModel};