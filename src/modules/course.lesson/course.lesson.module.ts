import { Module } from '@nestjs/common';
import { CourseLessonController } from './course.lesson.controller';
import { CourseLessonService } from './course.lesson.service';

@Module({
  controllers: [CourseLessonController],
  providers: [CourseLessonService]
})
export class CourseLessonModule {}