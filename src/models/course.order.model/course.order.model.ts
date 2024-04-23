import { Connection, Document, Model, Schema, SchemaType, SchemaTypes, connection } from 'mongoose';
import { UserModel } from '../user.model/user.model';
import { CourseModel } from '../course.model/course.model';

interface CourseOrder extends Document{
  readonly _id: string,
  readonly user: Partial<UserModel>,
  readonly course: Partial<CourseModel>,
  readonly orderDate: Date,
  readonly totalPrice: Number,
  readonly payment: string,
  readonly paymentStatus: string,
}

type CourseOrderModel = Model<CourseOrder>;

const CourseOrderSchema = new Schema<CourseOrder>(
  {
    _id: SchemaTypes.ObjectId,
    user:{ type: SchemaTypes.ObjectId, ref: 'User' },
    course:{ type: SchemaTypes.ObjectId, ref: 'Course' },
    orderDate: {type: SchemaTypes.Date, required: true},
    totalPrice: {type: SchemaTypes.Number, required: true},
    payment: {type: SchemaTypes.String, required: true},
    paymentStatus: {type: SchemaTypes.String, required: true},
  }
);

const createCourseOrderModel: (conn: Connection) => CourseOrderModel = (
  connection: Connection,
) => connection.model<CourseOrder>('CourseOrder', CourseOrderSchema, 'CourseOrders');

export {CourseOrder, CourseOrderModel, createCourseOrderModel};