import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ExamHistoryService } from './exam.history.service';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
import { Responser } from 'src/decorators/responser.decorator';


@ApiTags('Exam History')
@Controller({path: 'history', scope: Scope.REQUEST})
export class ExamHistoryController {
  constructor(private historyService: ExamHistoryService){}

  @Get('')
  @ApiQuery({ name: 'qUser', required: false })
  @ApiQuery({ name: 'qExam', required: false })
  getAllExamHistorys(
    @Query('qUser')  keywordUser?: string,
    @Query('qExam')  keywordExam?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<ExamHistory[]> {
    return this.historyService.findAll(keywordUser, keywordExam, skip, limit);
  }

  @Get(':id')
  getExamHistoryById(@Param('id', ParseObjectIdPipe)id : string) : Promise<ExamHistory>{
    return this.historyService.findById(id);
  }

  @Post('')
  @Responser.handle('Create course order')
  createExamHistory(
    @Body() courseOrder: CreateExamHistoryDTO,
  ) {
    return this.historyService.save(courseOrder);
  }

  @Put(':id')
  updateExamHistory(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() courseOrder: UpdateExamHistoryDTO,
    @Res() res: Response, 
  ) :Promise<ExamHistory>{
    return this.historyService.updateById(id, courseOrder);
  }

  @Delete(':id')
  deleteExamHistoryById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Promise<ExamHistory>{
    return this.historyService.deleteById(id);
  }
}
