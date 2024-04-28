import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { Teacher } from '../teacher/teacher.model';
import { CourseLessonModel } from '../course.lesson/course.lesson.model';
import { FeedbackModel } from '../feedback/feedback.model';
import { CategoryModel } from '../category/category.model';

interface Course extends Document{
	readonly title: string;
  readonly price: Number;
	readonly description: string;
	readonly rating: Number;
	readonly register: Number;
	readonly imageIntroduce: string;
  readonly imagePublicId: string;
  readonly videoIntroduce: string;
  readonly videoPublicId: string;
	readonly time: Number;
  readonly language: string;
  readonly updateAt: Date;
  readonly createAt: Date;
	readonly teacher: Partial<Teacher>;
	readonly category: Partial<CategoryModel>;
}

type CourseModel = Model<Course>;

const CourseSchema = new Schema<Course>(
	{
		title: {type: SchemaTypes.String, required: true},
    price: {type: SchemaTypes.Number, required: true},
		description: {type: SchemaTypes.String, required: true},
		rating: {type: SchemaTypes.Number, default: 5},
		register: {type: SchemaTypes.Number, required: true},
		imageIntroduce:{type: SchemaTypes.String, required: true},
		imagePublicId:{type: SchemaTypes.String, required: true},
    videoIntroduce:{type: SchemaTypes.String, required: true},
		videoPublicId:{type: SchemaTypes.String, required: true},
		time: {type: SchemaTypes.Number, required: true},
    language: {type: SchemaTypes.String, required: true},
    teacher: {type: SchemaTypes.ObjectId, ref: 'Teacher'},
		category: {type: SchemaTypes.ObjectId, ref: 'Category'},
	},{ timestamps: true }
);

const createCourseModel: (conn: Connection) => CourseModel =(
	connection: Connection,
) => connection.model<Course>('Course', CourseSchema, 'Courses');

export {Course, CourseModel, createCourseModel};