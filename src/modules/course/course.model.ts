import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { CategoryModel } from '../category/category.model';
import { User } from '../user/user.model';

interface Course extends Document{
	readonly title: string;
  readonly price: Number;
	readonly description: string;
	rating: number;
	register: number;
  reviews: number;
	readonly imageIntroduce: string;
  readonly imagePublicId: string;
  readonly videoIntroduce: string;
  readonly videoPublicId: string;
	readonly time: Number;
  readonly language: string;
	readonly teacher: Partial<User>;
	readonly category: Partial<CategoryModel>;
  deleteAt: Date
}

type CourseModel = Model<Course>;

const CourseSchema = new Schema<Course>(
	{
		title: {type: SchemaTypes.String, required: true},
    price: {type: SchemaTypes.Number, required: true},
		description: {type: SchemaTypes.String, required: true},
		rating: {type: SchemaTypes.Number, default: 5},
		register: {type: SchemaTypes.Number, default: 0},
		reviews: {type: SchemaTypes.Number, default: 0},
		imageIntroduce:{type: SchemaTypes.String, required: true},
		imagePublicId:{type: SchemaTypes.String, required: true},
    videoIntroduce:{type: SchemaTypes.String, required: true},
		videoPublicId:{type: SchemaTypes.String, required: true},
		time: {type: SchemaTypes.Number, required: true},
    language: {type: SchemaTypes.String, required: true},
    teacher: {type: SchemaTypes.ObjectId, ref: 'User', required: true},
		category: {type: SchemaTypes.ObjectId, ref: 'Category', required: true},
		deleteAt:{type: SchemaTypes.Date, default: null},
	},{ timestamps: true }
);

const createCourseModel: (conn: Connection) => CourseModel =(
	connection: Connection,
) => connection.model<Course>('Course', CourseSchema, 'Courses');

export {Course, CourseModel, createCourseModel};