import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { CourseModel } from '../course.model/course.model';

interface CourseLesson extends Document{
  readonly _id: string;
  readonly title: string;
  readonly selection: Number,
  readonly course: Partial<CourseModel>
}

type CourseLessonModel = Model<CourseLesson>;

const CourseLessonSchema = new Schema<CourseLesson>(
  {
    _id: SchemaTypes.ObjectId,
    title: {type: SchemaTypes.String, required: true},
    selection: {type: SchemaTypes.Number, required: true},
    course: { type: SchemaTypes.ObjectId, ref: 'Course' },
  }
)

const createCourseLessonModel: (conn: Connection) => CourseLessonModel = (
  connection: Connection,
) => connection.model<CourseLesson>('CourseLesson', CourseLessonSchema, 'CourseLessons');

export { CourseLesson, CourseLessonModel, createCourseLessonModel };
