import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { CourseOrderService } from './course.order.service';
import { CourseOrder } from './course.order.model';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course order')
@Controller('order')
export class CourseOrderController {
  constructor(private orderService: CourseOrderService){}

  @Get('')
  getAllCourseOrders(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<CourseOrder[]>{
    return this.orderService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getCourseOrderById(@Param('id', ParseObjectIdPipe)id : string) : Observable<CourseOrder>{
    return this.orderService.findById(id);
  }

  @Post('')
  createCourseOrder(
    @Body() courseOrder: CreateCourseOrderDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.orderService.save(courseOrder).pipe(
      map((feedback) => {
        return res
        .location('/courseOrders/' + feedback._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateCourseOrder(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() courseOrder: UpdateCourseOrderDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.orderService.update(id, courseOrder).pipe(
      map((courseOrder) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteCourseOrderById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.orderService.deleteById(id).pipe(
      map((courseOrder) => {
        return res.status(204).send();
      }),
    );
  }
}
