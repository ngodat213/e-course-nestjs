import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { UserModel } from '../user/user.model';
import { CourseModel } from '../course/course.model';

interface Feedback extends Document{
  readonly user: Partial<UserModel>,
  readonly course: Partial<CourseModel>,
  readonly title: string,
  readonly rating: Number,
  deleteAt: Date
}

type FeedbackModel = Model<Feedback>;

const FeedbackSchema = new Schema<Feedback>(
  {
    user: {type: SchemaTypes.ObjectId, ref: 'User'},
    course: {type: SchemaTypes.ObjectId, ref: 'Course'},
    title: {type: SchemaTypes.String, required: true},
    rating: {type: SchemaTypes.Number, required: true},
    deleteAt:{type: SchemaTypes.Date, default: null},
  },{ timestamps: true }
);

const createFeedbackModel: (conn: Connection) => FeedbackModel = (
  connection: Connection,
) => connection.model<Feedback>('Feedback', FeedbackSchema, 'Feedbacks');

export {Feedback, FeedbackModel, createFeedbackModel};
