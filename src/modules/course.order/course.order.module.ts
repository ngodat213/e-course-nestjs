import { Module } from '@nestjs/common';
import { CourseOrderController } from './course.order.controller';
import { CourseOrderService } from './course.order.service';

@Module({
  controllers: [CourseOrderController],
  providers: [CourseOrderService]
})
export class CourseOrderModule {}
