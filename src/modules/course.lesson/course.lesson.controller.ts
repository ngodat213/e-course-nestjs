import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { CourseLessonService } from './course.lesson.service';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
import { Response } from 'express';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course Lesson')
@Controller({path: 'course/lessons', scope: Scope.REQUEST})
export class CourseLessonController {
  constructor(private lessonService: CourseLessonService){}

  @Get('')
  getAllLessons(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<CourseLesson[]>{
    return this.lessonService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getLessonById(@Param('id', ParseObjectIdPipe)id : string) : Observable<CourseLesson>{
    return this.lessonService.findById(id);
  }

  @Post('')
  createLesson(
    @Body() lesson: CreateCourseLessonDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.lessonService.save(lesson).pipe(
      map((lesson) => {
        return res
        .location('/lessons' + lesson._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateLesson(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() lesson: UpdateCourseLessonDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.lessonService.update(id, lesson).pipe(
      map((lesson) => {
        return res.status(204).send();
      }),
    );
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
  getAllLessonsOfLesson(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Observable<CourseVideo[]>{
    return this.lessonService.videosOf(id);
  }
}
