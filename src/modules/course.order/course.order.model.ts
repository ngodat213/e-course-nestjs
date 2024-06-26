import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { UserModel } from '../user/user.model';
import { CourseModel } from '../course/course.model';

interface CourseOrder extends Document{
  readonly user: Partial<UserModel>,
  readonly course: Partial<CourseModel>,
  readonly totalPrice: Number,
  readonly payment: string,
  readonly paymentStatus: string,
  deleteAt: Date
}

type CourseOrderModel = Model<CourseOrder>;

const CourseOrderSchema = new Schema<CourseOrder>(
  {
    user:{ type: SchemaTypes.ObjectId, ref: 'User' },
    course:{ type: SchemaTypes.ObjectId, ref: 'Course' },
    totalPrice: {type: SchemaTypes.Number, required: true},
    payment: {type: SchemaTypes.String, required: true},
    paymentStatus: {type: SchemaTypes.String, required: true},
    deleteAt:{type: SchemaTypes.Date, default: null},
  },{ timestamps: true }
);

const createCourseOrderModel: (conn: Connection) => CourseOrderModel = (
  connection: Connection,
) => connection.model<CourseOrder>('CourseOrder', CourseOrderSchema, 'CourseOrders');

export {CourseOrder, CourseOrderModel, createCourseOrderModel};