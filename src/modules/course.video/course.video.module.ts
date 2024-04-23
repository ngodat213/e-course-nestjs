import { Module } from '@nestjs/common';
import { CourseVideoController } from './course.video.controller';
import { CourseVideoService } from './course.video.service';

@Module({
  controllers: [CourseVideoController],
  providers: [CourseVideoService]
})
export class CourseVideoModule {}
