import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { Response } from 'express';
import { CourseService } from './course.service';
import { Observable, map } from 'rxjs';
import { Course } from 'src/modules/course/course.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Responser } from 'src/decorators/responser.decorator';
import { CourseLesson } from '../course.lesson/course.lesson.model';

@ApiTags('Course')
@Controller({path: 'courses', scope: Scope.REQUEST})
export class CourseController {
  constructor(private courseService: CourseService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  getAllCourses(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Course[]> {
    return this.courseService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCourseById(@Param('id', ParseObjectIdPipe)id : string) : Promise<Course>{
    return this.courseService.findById(id);
  }

  @Post('')
  @Responser.handle('Create Course')
  createCourse(
    @Body() course: CreateCourseDTO,
  ) {
    return this.courseService.save(course);
  }

  @Put(':id')
  updateCourse(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() course: UpdateCourseDTO,
    @Res() res: Response, 
  ) :Promise<Course>{
    return this.courseService.updateById(id, course);
  }

  @Delete(':id')
  deleteCourseById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Course>{
    return this.courseService.deleteById(id);
  }

  @Get(':id/lessons')
  getAllLessonsOfCourse(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CourseLesson[]>{
    return this.courseService.lessonsOf(id);
  }
}
