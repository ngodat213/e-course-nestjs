import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { BlogModel } from './blog.model';
import { CourseModel } from './course.model';
import { TeacherModel} from './teacher.model';
import { ExamModel } from './exam.model';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { compare, hash } from 'bcrypt';
import { Observable, from, map } from 'rxjs';

interface User extends Document{
  comparePassword(password: string): Observable<boolean>;
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly photoUrl: string;
  readonly roles?: RoleType[];
  readonly blogs: Partial<BlogModel>;
  readonly qAs: Partial<BlogModel>;
  readonly courses: Partial<CourseModel>;
  readonly favouritesCourses: Partial<CourseModel>;
  readonly favouritesExams: Partial<ExamModel>;
  readonly finishedExams: Partial<ExamModel>;
  readonly favouritesTeachers: Partial<TeacherModel>;
  readonly favouritesBlogs: Partial<BlogModel>;
  readonly favouritesQAs: Partial<BlogModel>;
}

type UserModel = Model<User>;

const UserSchema = new Schema<User>(
   {
    email: {type: SchemaTypes.String, unique: true, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: SchemaTypes.String, required: true},
    username: {type: SchemaTypes.String, required: true},
    photoUrl: {type: SchemaTypes.String, default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"},
    roles: [{ type: SchemaTypes.String, enum: ['ADMIN','TEACHER', 'USER'], required: false },],
    blogs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
    qAs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
    courses:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesCourses:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Course' }] },
    favouritesExams:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Exam' }] },
    finishedExams:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Exam' }] },
    favouritesTeachers:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Teacher' }] },
    favouritesBlogs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
    favouritesQAs:{ type: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }] },
  },{ timestamps: true }
);

async function preSaveHook(next) {
  if(!this.isModified('password')) return next();

  // Hash the password
  const password = await hash(this.password, 12);
  this.set('password', password);

  next();
}

UserSchema.pre<User>('save', preSaveHook);

function comparePasswordMethod(password: string): Observable<boolean> {
  return from(compare(password, this.password));
}

UserSchema.methods.comparePassword = comparePasswordMethod;

// Virtual course

// Virtual exam

// Virtual blog

// Virtual favorite

// Virtual finish

const createUserModel: (conn: Connection) => UserModel = (
    connection: Connection,
  ) => connection.model<User>('User', UserSchema, 'Users');

export { User, UserModel, createUserModel, UserSchema, preSaveHook, comparePasswordMethod, };

