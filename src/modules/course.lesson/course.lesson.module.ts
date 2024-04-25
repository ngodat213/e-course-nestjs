import { Module } from '@nestjs/common';
import { CourseLessonController } from './course.lesson.controller';
import { CourseLessonService } from './course.lesson.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseLessonController],
  providers: [CourseLessonService]
})
export class CourseLessonModule {}
