import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { UserModel } from '../user.model/user.model';
import { CourseModel } from '../course.model/course.model';

interface Feedback extends Document{
  readonly _id: string,
  readonly user: Partial<UserModel>,
  readonly course: Partial<CourseModel>,
  readonly submitAt: Date,
  readonly title: string,
  readonly rating: Number,
}

type FeedbackModel = Model<Feedback>;

const FeedbackSchema = new Schema<Feedback>(
  {
    _id: SchemaTypes.ObjectId,
    user: {type: SchemaTypes.ObjectId, ref: 'User', required: true},
    course: {type: SchemaTypes.ObjectId, ref: 'Course', required: true},
    submitAt: {type: SchemaTypes.Date, required: true},
    title: {type: SchemaTypes.String, required: true},
    rating: {type: SchemaTypes.Number, required: true},
  }
);

const createFeedbackModel: (conn: Connection) => FeedbackModel = (
  connection: Connection,
) => connection.model<Feedback>('Feedback', FeedbackSchema, 'Feedbacks');

export {Feedback, FeedbackModel, createFeedbackModel};
