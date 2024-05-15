import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { CategoryModel } from '../category/category.model';

interface Exam extends Document{
  readonly title: string
  readonly description: string
  readonly imageUrl:  string
  readonly imagePublicId: string
  readonly category: Partial<CategoryModel>
}

type ExamModel = Model<Exam>;

const ExamSchema = new Schema<Exam>(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    imagePublicId: {type: String, required: true},
    category: {type: SchemaTypes.ObjectId, ref: 'Category'},
  },{ timestamps: true }
);

const createExamModel: (conn: Connection) => ExamModel = (
  connection: Connection,
) => connection.model<Exam>('Exam', ExamSchema, 'Exams');

export {Exam, ExamModel, createExamModel};