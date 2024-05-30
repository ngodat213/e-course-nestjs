import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { CourseLesson } from '../course.lesson/course.lesson.model';
import { IsOptional } from 'class-validator';

interface CourseVideo extends Document{
  readonly part: Number;
  readonly title: string;
  readonly hour: Number;
  readonly minute: Number;
  videoUrl: string;
  videoPublicId: string;
  readonly lesson: Partial<CourseLesson>;
  deleteAt: Date
}

type CourseVideoModel = Model<CourseVideo>;

const CourseVideoSchema = new Schema<CourseVideo>(
  {
    part: {type: SchemaTypes.Number, required: true},
    title: {type: SchemaTypes.String, required: true},
    hour: {type: SchemaTypes.Number, required: true},
    minute: {type: SchemaTypes.Number, required: true},
    videoUrl: {type: SchemaTypes.String, required: true},
    videoPublicId: {type: SchemaTypes.String, required: true},
    lesson: { type: SchemaTypes.ObjectId, ref: 'Lesson' , required: true},
    deleteAt:{type: SchemaTypes.Date, default: null},
  },{ timestamps: true }
);

const createCourseVideoModel: (conn: Connection) => CourseVideoModel = (
  connection: Connection,
) => connection.model<CourseVideo>('CourseVideo', CourseVideoSchema, 'CourseVideos');

export {CourseVideo, CourseVideoModel, createCourseVideoModel};
