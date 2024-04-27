import { Module } from '@nestjs/common';
import { ExamHistoryController } from './exam.history.controller';
import { ExamHistoryService } from './exam.history.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamHistoryController],
  providers: [ExamHistoryService]
})
export class ExamHistoryModule {}
