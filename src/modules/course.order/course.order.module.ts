import { Module } from '@nestjs/common';
import { CourseOrderController } from './course.order.controller';
import { CourseOrderService } from './course.order.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseOrderController],
  providers: [CourseOrderService]
})
export class CourseOrderModule {}
