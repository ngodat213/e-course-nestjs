import { Module } from '@nestjs/common';
import { ExamLessonController } from './exam.lesson.controller';
import { ExamLessonService } from './exam.lesson.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [ExamLessonController],
  providers: [ExamLessonService]
})
export class ExamLessonModule {}
