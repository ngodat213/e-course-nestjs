import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface CourseVideo extends Document{
  readonly _id: string;
  readonly part: Number;
  readonly title: string;
  readonly hour: Number;
  readonly minute: Number;
  readonly videoUrl: string;
  readonly videoPublicId: string;
}

type CourseVideoModel = Model<CourseVideo>;

const CourseVideoSchema = new Schema<CourseVideo>(
  {
    _id: SchemaTypes.ObjectId,
    part: {type: SchemaTypes.Number, required: true},
    title: {type: SchemaTypes.String, required: true},
    hour: {type: SchemaTypes.Number, required: true},
    minute: {type: SchemaTypes.Number, required: true},
    videoUrl: {type: SchemaTypes.String, required: true},
    videoPublicId: {type: SchemaTypes.String, required: true},
  }
);

const createCourseVideoModel: (conn: Connection) => CourseVideoModel = (
  connection: Connection,
) => connection.model<CourseVideo>('CourseVideo', CourseVideoSchema, 'CourseVideos');

export {CourseVideo, CourseVideoModel, createCourseVideoModel};
