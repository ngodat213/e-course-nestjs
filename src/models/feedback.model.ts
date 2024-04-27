import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { UserModel } from './user.model';
import { CourseModel } from './course.model';

interface Feedback extends Document{
  readonly user: Partial<UserModel>,
  readonly course: Partial<CourseModel>,
  readonly title: string,
  readonly rating: Number,
}

type FeedbackModel = Model<Feedback>;

const FeedbackSchema = new Schema<Feedback>(
  {
    user: {type: SchemaTypes.ObjectId, ref: 'User', required: true},
    course: {type: SchemaTypes.ObjectId, ref: 'Course', required: true},
    title: {type: SchemaTypes.String, required: true},
    rating: {type: SchemaTypes.Number, required: true},
  },{ timestamps: true }
);

const createFeedbackModel: (conn: Connection) => FeedbackModel = (
  connection: Connection,
) => connection.model<Feedback>('Feedback', FeedbackSchema, 'Feedbacks');

export {Feedback, FeedbackModel, createFeedbackModel};
