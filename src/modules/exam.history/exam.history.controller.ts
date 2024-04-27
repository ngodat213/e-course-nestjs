import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ExamHistoryService } from './exam.history.service';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';


@ApiTags('Exam History')
@Controller({path: 'history', scope: Scope.REQUEST})
export class ExamHistoryController {
  constructor(private historyService: ExamHistoryService){}

  @Get('')
  getAllExamHistorys(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<ExamHistory[]>{
    return this.historyService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getExamHistoryById(@Param('id', ParseObjectIdPipe)id : string) : Observable<ExamHistory>{
    return this.historyService.findById(id);
  }

  @Post('')
  createExamHistory(
    @Body() history: CreateExamHistoryDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.historyService.save(history).pipe(
      map((history) => {
        return res
        .location('/examhistory/' + history._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateExamHistory(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() history: UpdateExamHistoryDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.historyService.update(id, history).pipe(
      map((history) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
  deleteExamHistoryById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.historyService.deleteById(id).pipe(
      map((history) => {
        return res.status(204).send();
      }),
    );
  }
}
