import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface QuizLesson extends Document{
    
}

type QuizLessonModel = Model<QuizLesson>;

const QuizLessonSchema = new Schema<QuizLesson>(
  {

  }
);

const createQuizLessonModel: (conn: Connection) => QuizLessonModel = (
  connection: Connection,
) => connection.model<QuizLesson>('QuizLesson', QuizLessonSchema, 'QuizLessons');

export { QuizLesson , QuizLessonModel, createQuizLessonModel };

