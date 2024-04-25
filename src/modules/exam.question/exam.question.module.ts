import { Module } from '@nestjs/common';
import { ExamQuestionController } from './exam.question.controller';
import { ExamQuestionService } from './exam.question.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamQuestionController],
  providers: [ExamQuestionService]
})
export class ExamQuestionModule {}
