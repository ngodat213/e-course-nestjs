import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule} from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { CourseLessonModule } from './modules/course.lesson/course.lesson.module';
import { CourseVideoModule } from './modules/course.video/course.video.module';
import { ExamModule } from './modules/exam/exam.module';
import { ExamLessonModule } from './modules/exam.lesson/exam.lesson.module';
import { ExamQuestionModule } from './modules/exam.question/exam.question.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseOrderModule } from './modules/course.order/course.order.module';
import { ExamHistoryModule } from './modules/exam.history/exam.history.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { DatabaseModule } from './database/database.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { HelperModuleModule } from './helper/helper.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ignoreEnvFile: true}),
    DatabaseModule,
    ContactModule,
    CourseModule,
    CourseLessonModule,
    CourseVideoModule,
    CourseOrderModule,
    ExamModule,
    ExamLessonModule,
    ExamQuestionModule,
    ExamHistoryModule,
    UserModule,
    FeedbackModule,
    CategoryModule,
    CloudinaryModule,
    HelperModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
