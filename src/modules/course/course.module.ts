import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from '../user/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [CourseService, UserService, CloudinaryService]
})
export class CourseModule {}
