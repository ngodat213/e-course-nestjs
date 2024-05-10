import { Module } from '@nestjs/common';
import { ExamHistoryController } from './exam.history.controller';
import { ExamHistoryService } from './exam.history.service';
import { DatabaseModule } from 'src/processors/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamHistoryController],
  providers: [ExamHistoryService, UserService]
})
export class ExamHistoryModule {}
