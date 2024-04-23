import { Module } from '@nestjs/common';
import { ExamQuestionController } from './exam.question.controller';
import { ExamQuestionService } from './exam.question.service';

@Module({
  controllers: [ExamQuestionController],
  providers: [ExamQuestionService]
})
export class ExamQuestionModule {}
