import { Module } from '@nestjs/common';
import { ExamLessonController } from './exam.lesson.controller';
import { ExamLessonService } from './exam.lesson.service';

@Module({
  controllers: [ExamLessonController],
  providers: [ExamLessonService]
})
export class ExamLessonModule {}
