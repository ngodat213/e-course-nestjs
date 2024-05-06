import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CourseOrderService } from './course.order.service';
import { CourseOrder } from './course.order.model';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Responser } from 'src/decorators/responser.decorator';

@ApiTags('Course order')
@Controller('order')
export class CourseOrderController {
  constructor(private orderService: CourseOrderService){}

  @Get('')
  @ApiQuery({ name: 'qUser', required: false })
  @ApiQuery({ name: 'qCourse', required: false })
  getAllCourseOrders(
    @Query('qUser')  keywordUser?: string,
    @Query('qCourse')  keywordCourse?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<CourseOrder[]> {
    return this.orderService.findAll(keywordUser, keywordCourse, skip, limit);
  }

  @Get(':id')
  getCourseOrderById(@Param('id', ParseObjectIdPipe)id : string) : Promise<CourseOrder>{
    return this.orderService.findById(id);
  }

  @Post('')
  @Responser.handle('Create course order')
  createCourseOrder(
    @Body() courseOrder: CreateCourseOrderDTO,
  ) {
    return this.orderService.save(courseOrder);
  }

  @Put(':id')
  updateCourseOrder(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() courseOrder: UpdateCourseOrderDTO,
    @Res() res: Response, 
  ) :Promise<CourseOrder>{
    return this.orderService.updateById(id, courseOrder);
  }

  @Delete(':id')
  deleteCourseOrderById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Promise<CourseOrder>{
    return this.orderService.deleteById(id);
  }
}
