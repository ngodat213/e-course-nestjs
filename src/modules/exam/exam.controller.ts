import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
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
  @ApiQuery({ name: 'q', required: false })
  getAllExams(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Exam[]> {
    return this.examService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getExamById(@Param('id', ParseObjectIdPipe)id : string) : Promise<Exam>{
    return this.examService.findById(id);
  }

  @Post('')
  createExam(
    @Body() exam: CreateExamDTO,
  ) {
    return this.examService.save(exam);
  }

  @Put(':id')
  updateExam(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() exam: UpdateExamDTO,
    @Res() res: Response, 
  ) :Promise<Exam>{
    return this.examService.updateById(id, exam);
  }

  @Delete(':id')
  deleteExamById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Exam>{
    return this.examService.deleteById(id);
  }

  @Get(':id/lessons')
  getAllLessonsOfExam(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ExamLesson[]>{
    return this.examService.lessonsOf(id);
  }
}
