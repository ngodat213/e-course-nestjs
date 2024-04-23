import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { CourseLessonModule } from './modules/course.lesson/course.lesson.module';
import { CourseVideoModule } from './modules/course.video/course.video.module';
import { ExamModule } from './modules/exam/exam.module';
import { ExamLessonModule } from './modules/exam.lesson/exam.lesson.module';
import { ExamQuestionModule } from './modules/exam.question/exam.question.module';
import { CategoryModule } from './modules/category/category.module';
import { ContactModule } from './modules/contact/contact.module';
import { CourseOrderModule } from './modules/course.order/course.order.module';
import { ExamHistoryModule } from './modules/exam.history/exam.history.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { BlogModule } from './modules/blog/blog.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        // MONGO_PATH: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
 
        return {
          uri: `mongodb+srv://${username}:${password}@${host}`,
        };
      },
      inject: [ConfigService],
    }),UserModule, CourseModule, CourseLessonModule, CourseVideoModule, ExamModule, ExamLessonModule, ExamQuestionModule, CategoryModule, ContactModule, CourseOrderModule, ExamHistoryModule, FeedbackModule, BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
