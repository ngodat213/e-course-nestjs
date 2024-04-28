import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamLessonService } from './exam.lesson.service';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
import { Response } from 'express';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';

@ApiTags('Exam Lesson')
@Controller({path: 'exam/lessons', scope: Scope.REQUEST})
export class ExamLessonController {
  constructor(private lessonService: ExamLessonService){}

  @Get('')
  getAllLessons(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<ExamLesson[]>{
    return this.lessonService.findAll(keyword,skip, limit);
  }

  @Get(':id')
  getLessonById(@Param('id', ParseObjectIdPipe)id : string) : Observable<ExamLesson>{
    return this.lessonService.findById(id);
  }

  @Post('')
  createLesson(
    @Body() lesson: CreateExamLessonDTO,
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
    @Body() lesson: UpdateExamLessonDTO,
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

  @Get(':id/questions')
  getAllLessonsOfLesson(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Observable<ExamQuestion[]>{
    return this.lessonService.questionsOf(id);
  }
}
