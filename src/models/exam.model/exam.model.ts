import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';

interface Exam extends Document{
  readonly _id: string,
  readonly title: string,
  readonly description: string,
  readonly category: string,
  readonly imageUrl:  string,
}

type ExamModel = Model<Exam>;

const ExamSchema = new Schema<Exam>(
  {
    _id: SchemaTypes.ObjectId,
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true},
  }
);

const createExamModel: (conn: Connection) => ExamModel = (
  connection: Connection,
) => connection.model<Exam>('Exam', ExamSchema, 'Exams');

export {Exam, ExamModel, createExamModel};