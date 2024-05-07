import { Module } from '@nestjs/common';
import { CourseLessonController } from './course.lesson.controller';
import { CourseLessonService } from './course.lesson.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseLessonController],
  providers: [CourseLessonService, UserService]
})
export class CourseLessonModule {}
