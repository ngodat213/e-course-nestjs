import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

interface CourseVideo extends Document{
  readonly _id: string;
  readonly title: string;
  readonly part: Number;
  readonly videoUrl: string;
  readonly description: string;
  readonly hour: Number;
  readonly minute: Number;
  readonly comments: Partial<Comment>
}

type CourseVideoModel = Model<CourseVideo>;

const CourseVideoSchema = new Schema<CourseVideo>(
  {
    _id: SchemaTypes.ObjectId,
    title: {type: SchemaTypes.String, required: true},
    part: {type: SchemaTypes.Number, required: true},
    videoUrl: {type: SchemaTypes.String, required: true},
    description: {type: SchemaTypes.String, required: true},
    hour: {type: SchemaTypes.Number, required: true},
    minute: {type: SchemaTypes.Number, required: true},
    comments: { type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }] },
  }
);

const createCourseVideoModel: (conn: Connection) => CourseVideoModel = (
  connection: Connection,
) => connection.model<CourseVideo>('CourseVideo', CourseVideoSchema, 'CourseVideos');

export {CourseVideo, CourseVideoModel, createCourseVideoModel};
