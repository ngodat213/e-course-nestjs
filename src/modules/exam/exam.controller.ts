import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ExamService } from './exam.service';
import { Exam } from 'src/modules/exam/exam.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';

@ApiTags('Exam')
@Controller({path: 'exams', scope: Scope.REQUEST})
export class ExamController {
  constructor(private examService: ExamService){}

  @Get('')
  getAllExams(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<Exam[]>{
    return this.examService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getExamById(@Param('id', ParseObjectIdPipe)id : string) : Observable<Exam>{
    return this.examService.findById(id);
  }

  @Post('')
  createExam(
    @Body() exam: CreateExamDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.examService.save(exam).pipe(
      map((exam) => {
        return res
        .location('/exams/' + exam._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateExam(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() exam: UpdateExamDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.examService.update(id, exam).pipe(
      map((exam) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteExamById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.examService.deleteById(id).pipe(
      map((exam) => {
        return res.status(204).send();
      }),
    );
  }

  @Get(':id/lessons')
  getAllLessonsOfExam(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Observable<ExamLesson[]>{
    return this.examService.lessonsOf(id);
  }
}
