import { Connection, Document, Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { Teacher } from '../teacher.model/teacher.model';
import { CourseLessonModel } from '../course.lesson.model/course.lesson.model';
import { Feedback } from '../feedback.model/feedback.model';

interface Course extends Document{
	readonly _id: string;
	readonly teacherId: Partial<Teacher>;
	readonly courseImage: string;
	readonly title: string;
	readonly description: string;
	readonly time: string;
	readonly category: string;
	readonly rating: Number;
	readonly register: Number;
	readonly lessons: Partial<CourseLessonModel>
	readonly feedbacks: Partial<Feedback>
}

type CourseModel = Model<Course>;

const CourseSchema = new Schema<Course>(
	{
		_id: SchemaTypes.ObjectId,
		courseImage:{type: SchemaTypes.String, required: true},
    teacherId: {type: SchemaTypes.ObjectId, ref: 'Teacher'},
		title: {type: SchemaTypes.String, required: true},
		description: {type: SchemaTypes.String, required: true},
		time: {type: SchemaTypes.String, required: true},
		category: {type: SchemaTypes.String, required: true},
		rating: {type: SchemaTypes.Number, default: 5},
		register: {type: SchemaTypes.Number, required: true},
		lessons: { type: [{ type: SchemaTypes.ObjectId, ref: 'CourseLesson' }] },
		feedbacks: { type: [{ type: SchemaTypes.ObjectId, ref: 'Feedback' }] },
	}
);

const createCourseModel: (conn: Connection) => CourseModel =(
	connection: Connection,
) => connection.model<Course>('Course', CourseSchema, 'Courses');

export {Course, CourseModel, createCourseModel};