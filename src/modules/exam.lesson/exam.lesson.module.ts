import { Module } from '@nestjs/common';
import { ExamLessonController } from './exam.lesson.controller';
import { ExamLessonService } from './exam.lesson.service';
import { DatabaseModule } from 'src/processors/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports:[DatabaseModule],
  controllers: [ExamLessonController],
  providers: [ExamLessonService, UserService]
})
export class ExamLessonModule {}
