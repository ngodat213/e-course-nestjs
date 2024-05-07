import { Module } from '@nestjs/common';
import { CourseOrderController } from './course.order.controller';
import { CourseOrderService } from './course.order.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseOrderController],
  providers: [CourseOrderService, UserService]
})
export class CourseOrderModule {}
