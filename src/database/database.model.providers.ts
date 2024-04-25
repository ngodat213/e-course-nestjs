import { BLOG_MODEL, CATEGORY_MODEL, CONTACT_MODEL, COURSE_LESSON_MODEL, COURSE_MODEL, COURSE_ORDER_MODEL, COURSE_VIDEO_MODEL, DATABASE_CONNECTION, EXAM_HISTORY_MODEL, EXAM_LESSON_MODEL, EXAM_MODEL, EXAM_QUESTION_MODEL, FEEDBACK_MODEL, USER_MODEL } from './database.constants';
import { Connection } from 'mongoose';
import { createCourseModel } from 'src/models/course.model/course.model';
import { createCourseLessonModel } from 'src/models/course.lesson.model/course.lesson.model';
import { createCourseVideoModel } from 'src/models/course.video.model/course.video.model';
import { createCourseOrderModel } from 'src/models/course.order.model/course.order.model';
import { createExamModel } from 'src/models/exam.model/exam.model';
import { createExamLessonModel } from 'src/models/exam.lesson.model/exam.lesson.model';
import { createExamHistoryModel } from 'src/models/exam.history.model/exam.history.model';
import { createUserModel } from 'src/models/user.model/user.model';
import { createFeedbackModel } from 'src/models/feedback.model/feedback.model';
import { createBlogModel } from 'src/models/blog.model/blog.model';
import { createCategoryModel } from 'src/models/category.model/category.model';
import { createContactModel } from 'src/models/contact.model/contact.model';

  export const databaseModelsProviders = [
    // course
    {
      provide: COURSE_MODEL,
      useFactory: (connection: Connection) => createCourseModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: COURSE_LESSON_MODEL,
      useFactory: (connection: Connection) => createCourseLessonModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: COURSE_VIDEO_MODEL,
      useFactory: (connection: Connection) => createCourseVideoModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: COURSE_ORDER_MODEL,
      useFactory: (connection: Connection) => createCourseOrderModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    // exam
    {
      provide: EXAM_MODEL,
      useFactory: (connection: Connection) => createExamModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: EXAM_LESSON_MODEL,
      useFactory: (connection: Connection) => createExamLessonModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: EXAM_QUESTION_MODEL,
      useFactory: (connection: Connection) => createExamLessonModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: EXAM_HISTORY_MODEL,
      useFactory: (connection: Connection) => createExamHistoryModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    // user
    {
      provide: USER_MODEL,
      useFactory: (connection: Connection) => createUserModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: FEEDBACK_MODEL,
      useFactory: (connection: Connection) => createFeedbackModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: BLOG_MODEL,
      useFactory: (connection: Connection) => createBlogModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: USER_MODEL,
      useFactory: (connection: Connection) => createUserModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: CATEGORY_MODEL,
      useFactory: (connection: Connection) => createCategoryModel(connection),
      inject: [DATABASE_CONNECTION]
    },
    {
      provide: CONTACT_MODEL,
      useFactory: (connection: Connection) => createContactModel(connection),
      inject: [DATABASE_CONNECTION]
    },
  ]