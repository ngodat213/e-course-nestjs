import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';
import { Observable, map } from 'rxjs';
import { Course } from 'src/models/course.model/course.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from 'src/models/course.lesson.model/course.lesson.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller({path: 'courses', scope: Scope.REQUEST})
export class CourseController {
  constructor(private courseService: CourseService){}

  @Get('')
  getAllCourses(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<Course[]>{
    return this.courseService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getCourseById(@Param('id', ParseObjectIdPipe)id : string) : Observable<Course>{
    return this.courseService.findById(id);
  }

  @Post('')
  createCourse(
    @Body() course: CreateCourseDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.courseService.save(course).pipe(
      map((course) => {
        return res
        .location('/courses' + course._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateCourse(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() course: UpdateCourseDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.courseService.update(id, course).pipe(
      map((course) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteCourseById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.courseService.deleteById(id).pipe(
      map((course) => {
        return res.status(204).send();
      }),
    );
  }

  @Get(':id/lessons')
  getAllLessonsOfCourse(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Observable<CourseLesson[]>{
    return this.courseService.lessonsOf(id);
  }
}
