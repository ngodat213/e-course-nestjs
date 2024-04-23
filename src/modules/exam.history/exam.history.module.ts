import { Module } from '@nestjs/common';
import { ExamHistoryController } from './exam.history.controller';
import { ExamHistoryService } from './exam.history.service';

@Module({
  controllers: [ExamHistoryController],
  providers: [ExamHistoryService]
})
export class ExamHistoryModule {}
