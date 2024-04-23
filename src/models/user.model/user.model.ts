import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { BlogModel } from '../blog.model/blog.model';
import { CourseModel } from '../course.model/course.model';
import { TeacherModel} from '../teacher.model/teacher.model';
import { ExamModel } from '../exam.model/exam.model';

interface User extends Document{
  readonly _id: string;
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly photoUrl: string;
  readonly blogs: Partial<BlogModel>;
  readonly qAs: Partial<BlogModel>;
  readonly courses: Partial<CourseModel>;
  readonly favouritesCourses: Partial<CourseModel>;
  readonly favouritesQuizs: Partial<ExamModel>;
  readonly finishedQuizs: Partial<ExamModel>;
  readonly favouritesTeachers: Partial<TeacherModel>;
  readonly favouritesBlogs: Partial<BlogModel>;
  readonly favouritesQAs: Partial<BlogModel>;
  readonly created: Date;
  readonly signedIn: Date;
}

type UserModel = Model<User>;

const UserSchema = new Schema<User>(
   {
    _id: SchemaTypes.ObjectId,
    email: {type: SchemaTypes.String, unique: true, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: SchemaTypes.String, required: true},
    username: {type: SchemaTypes.String, required: true},
    photoUrl: {type: SchemaTypes.String, default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"},
    blogs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
    qAs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
    courses:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesCourses:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesQuizs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Exam' }] },
    finishedQuizs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Exam' }] },
    favouritesTeachers:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Teacher' }] },
    favouritesBlogs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
    favouritesQAs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
    created:{type: SchemaTypes.Date},
    signedIn:{type: SchemaTypes.Date},
  } 
);

const createUserModel: (conn: Connection) => UserModel = (
    connection: Connection,
  ) => connection.model<User>('User', UserSchema, 'Users');

export { User, UserModel, createUserModel };

