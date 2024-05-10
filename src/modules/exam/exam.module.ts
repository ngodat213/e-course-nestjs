import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { DatabaseModule } from 'src/processors/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExamController],
  providers: [ExamService, UserService]
})
export class ExamModule {}
