import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { Teacher } from '../teacher.model/teacher.model';
import { CourseLessonModel } from '../course.lesson.model/course.lesson.model';
import { FeedbackModel } from '../feedback.model/feedback.model';
import { CategoryModel } from '../category.model/category.model';

interface Course extends Document{
	readonly _id: string;
	readonly title: string;
  readonly price: Number;
	readonly description: string;
	readonly rating: Number;
	readonly register: Number;
	readonly imageIntroduce: string;
  readonly imagePublicId: string;
  readonly videoIntroduce: string;
  readonly videoPublicId: string;
	readonly time: string;
  readonly language: string;
  readonly updateAt: Date;
  readonly createAt: Date;
	readonly teacherId: Partial<Teacher>;
	readonly category: Partial<CategoryModel>;
	readonly feedbacks: Partial<FeedbackModel>
	readonly lessons: Partial<CourseLessonModel>
}

type CourseModel = Model<Course>;

const CourseSchema = new Schema<Course>(
	{
		_id: SchemaTypes.ObjectId,
		title: {type: SchemaTypes.String, required: true},
    price: {type: SchemaTypes.Number, required: true},
		description: {type: SchemaTypes.String, required: true},
		rating: {type: SchemaTypes.Number, default: 5},
		register: {type: SchemaTypes.Number, required: true},
		imageIntroduce:{type: SchemaTypes.String, required: true},
		imagePublicId:{type: SchemaTypes.String, required: true},
    videoIntroduce:{type: SchemaTypes.String, required: true},
		videoPublicId:{type: SchemaTypes.String, required: true},
		time: {type: SchemaTypes.String, required: true},
    language: {type: SchemaTypes.String, required: true},
    updateAt: {type: SchemaTypes.Date, required: true},
    createAt:{type: SchemaTypes.Date, required: true},
    teacherId: {type: SchemaTypes.ObjectId, ref: 'Teacher'},
		category: {type: SchemaTypes.ObjectId, required: true, ref: 'Category'},
		feedbacks: { type: [{ type: SchemaTypes.ObjectId, ref: 'Feedback' }] },
		lessons: { type: [{ type: SchemaTypes.ObjectId, ref: 'CourseLesson' }] },
	}
);

const createCourseModel: (conn: Connection) => CourseModel =(
	connection: Connection,
) => connection.model<Course>('Course', CourseSchema, 'Courses');

export {Course, CourseModel, createCourseModel};