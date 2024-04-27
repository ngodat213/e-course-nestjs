import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { CourseModel } from '../course.model/course.model';
import { BlogModel } from '../blog.model/blog.model';
import { ExamModel } from '../exam.model/exam.model';

interface Teacher extends Document{
  readonly description: string;
  readonly courses: Partial<CourseModel>
  readonly exams: Partial<ExamModel>
  readonly blogs: Partial<BlogModel>
}

type TeacherModel = Model<Teacher>;

const TeacherSchema = new Schema<Teacher>(
  {
    description: {type: SchemaTypes.String, required: true},
    courses: [{type: SchemaTypes.ObjectId, ref: "Course"}],
    exams: [{type: SchemaTypes.ObjectId, ref: "Exam"}],
    blogs: [{type: SchemaTypes.ObjectId, ref: "Blog"}]
  }
);

const createTeacherModel: (conn: Connection) => TeacherModel = (
  connection: Connection
) => connection.model<Teacher>('Teacher', TeacherSchema, 'Teachers');

export {Teacher, TeacherModel, createTeacherModel};