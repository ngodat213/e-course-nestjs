import { Module } from '@nestjs/common';
import { CourseVideoController } from './course.video.controller';
import { CourseVideoService } from './course.video.service';
import { DatabaseModule } from 'src/processors/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseVideoController],
  providers: [CourseVideoService, UserService]
})
export class CourseVideoModule {}
