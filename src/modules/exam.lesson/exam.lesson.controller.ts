import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamLessonService } from './exam.lesson.service';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
import { Response } from 'express';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { Responser } from 'src/decorators/responser.decorator';

@ApiTags('Exam Lesson')
@Controller({path: 'exam/lessons', scope: Scope.REQUEST})
export class ExamLessonController {
  constructor(private lessonService: ExamLessonService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  getAllCourseLessons(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<ExamLesson[]> {
    return this.lessonService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getCourseLessonById(@Param('id', ParseObjectIdPipe)id : string) : Promise<ExamLesson>{
    return this.lessonService.findById(id);
  }

  @Post('')
  @Responser.handle('Create course lesson')
  createCourseLesson(
    @Body() lesson: CreateExamLessonDTO,
  ) {
    return this.lessonService.save(lesson);
  }

  @Put(':id')
  updateCourseLesson(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() lesson: UpdateExamLessonDTO,
  ) :Promise<ExamLesson>{
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

  @Get(':id/questions')
  getAllExamOfLesson(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ExamQuestion[]>{
    return this.lessonService.questionsOf(id);
  }
}
