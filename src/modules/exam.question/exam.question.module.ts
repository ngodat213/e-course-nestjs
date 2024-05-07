import { Module } from '@nestjs/common';
import { ExamQuestionController } from './exam.question.controller';
import { ExamQuestionService } from './exam.question.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamQuestionController],
  providers: [ExamQuestionService, UserService]
})
export class ExamQuestionModule {}
