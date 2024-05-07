import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ExamService } from './exam.service';
import { Exam } from 'src/modules/exam/exam.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';

@ApiTags('Exam')
@ApiBearerAuth()
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
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  createExam(
    @Body() exam: CreateExamDTO,
  ) {
    return this.examService.save(exam);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  updateExam(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() exam: UpdateExamDTO,
    @Res() res: Response, 
  ) :Promise<Exam>{
    return this.examService.updateById(id, exam);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
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
  ): Promise<ExamLesson[]>{
    return this.examService.lessonsOf(id);
  }
}
