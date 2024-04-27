import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExamQuestionService } from './exam.question.service';
import { ExamQuestion } from 'src/models/exam.question.model';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';

@ApiTags('Exam question')
@Controller({path: 'exam/questions', scope: Scope.REQUEST})
export class ExamQuestionController {
  constructor(private questionService: ExamQuestionService){}

  @Get('')
  getAllQuestions(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<ExamQuestion[]>{
    return this.questionService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getQuestionById(@Param('id', ParseObjectIdPipe)id : string) : Observable<ExamQuestion>{
    return this.questionService.findById(id);
  }

  @Post('')
  createQuestion(
    @Body() video: CreateExamQuestionDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.questionService.save(video).pipe(
      map((video) => {
        return res
        .location('/videos' + video._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateQuestion(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() video: UpdateExamQuestionDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.questionService.update(id, video).pipe(
      map((video) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteQuestionById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.questionService.deleteById(id).pipe(
      map((video) => {
        return res.status(204).send();
      }),
    );
  }
}
