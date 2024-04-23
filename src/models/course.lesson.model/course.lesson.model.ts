import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { CourseVideoModel } from '../course.video.model/course.video.model';

interface CourseLesson extends Document{
  readonly _id: string;
  readonly title: string;
  readonly selection: Number,
  readonly videos: Partial<CourseVideoModel>
}

type CourseLessonModel = Model<CourseLesson>;

const CourseLessonSchema = new Schema<CourseLesson>(
  {
    _id: SchemaTypes.ObjectId,
    title: {type: SchemaTypes.String, required: true},
    selection: {type: SchemaTypes.Number, required: true},
    videos: { type: [{ type: SchemaTypes.ObjectId, ref: 'Video' }] },
  }
)

const createCourseLessonModel: (conn: Connection) => CourseLessonModel = (
  connection: Connection,
) => connection.model<CourseLesson>('CourseLesson', CourseLessonSchema, 'CourseLessons');

export { CourseLesson, CourseLessonModel, createCourseLessonModel };
