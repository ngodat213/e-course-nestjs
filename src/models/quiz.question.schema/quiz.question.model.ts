import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface QuizQuestion extends Document{
    
}

type QuizQuestionModel = Model<QuizQuestion>;

const QuizQuestionSchema = new Schema<QuizQuestion>(
  {

  }
);

const createQuizQuestionModel: (conn: Connection) => QuizQuestionModel = (
  connection: Connection,
) => connection.model<QuizQuestion>('QuizQuestion', QuizQuestionSchema, 'QuizQuestions');

export { QuizQuestion, QuizQuestionModel, createQuizQuestionModel as createBlogModel };

