import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
import { Response } from 'express';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Responser } from 'src/decorators/responser.decorator';

@ApiTags('Course Lesson')
@Controller({path: 'course/lessons', scope: Scope.REQUEST})
export class CourseLessonController {
  constructor(private lessonService: CourseLessonService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  getAllCourseLessons(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<CourseLesson[]> {
    return this.lessonService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCourseLessonById(@Param('id', ParseObjectIdPipe)id : string) : Promise<CourseLesson>{
    return this.lessonService.findById(id);
  }

  @Post('')
  @Responser.handle('Create course lesson')
  createCourseLesson(
    @Body() lesson: CreateCourseLessonDTO,
  ) {
    return this.lessonService.save(lesson);
  }

  @Put(':id')
  updateCourseLesson(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() lesson: UpdateCourseLessonDTO,
  ) :Promise<CourseLesson>{
    return this.lessonService.updateById(id, lesson);
  }

  @Delete(':id')
  deleteLessonById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.lessonService.deleteById(id).pipe(
      map((lesson) => {
        return res.status(204).send();
      }),
    );
  }

  @Get(':id/videos')
  getAllLessonsOfCourse(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<CourseVideo[]>{
    return this.lessonService.lessonsOf(id);
  }
}
