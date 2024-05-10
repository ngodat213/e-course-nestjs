import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExamQuestionService } from './exam.question.service';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { Observable, map } from 'rxjs';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileToBodyInterceptor } from 'src/decorators/api.file.decorator';

@ApiTags('Exam question')
@ApiBearerAuth()
@Controller({path: 'exam/questions', scope: Scope.REQUEST})
export class ExamQuestionController {
  constructor(private questionService: ExamQuestionService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  getAllExams(
    @Query('q')  keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<ExamQuestion[]> {
    return this.questionService.findAll(keyword, skip, limit);
  }

  @Get(':id')
  getExamById(@Param('id', ParseObjectIdPipe)id : string) : Promise<ExamQuestion>{
    return this.questionService.findById(id);
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  createExam(
    @Body() exam: CreateExamQuestionDTO,
  ) {
    return this.questionService.save(exam);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  updateExam(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() exam: UpdateExamQuestionDTO,
    @Res() res: Response, 
  ) :Promise<ExamQuestion>{
    return this.questionService.updateById(id, exam);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
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
