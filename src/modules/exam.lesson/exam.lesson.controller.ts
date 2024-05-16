import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamLessonService } from './exam.lesson.service';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';
import { Response } from 'express';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { Responser } from 'src/decorators/responser.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';

@ApiTags('Exam Lesson')
@ApiBearerAuth()
@Controller({path: 'exam/lessons', scope: Scope.REQUEST})
export class ExamLessonController {
  constructor(private lessonService: ExamLessonService){}

  @Get('')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
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
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  createCourseLesson(
    @Body() lesson: CreateExamLessonDTO,
  ) {
    return this.lessonService.save(lesson);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  updateCourseLesson(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() lesson: UpdateExamLessonDTO,
  ) :Promise<ExamLesson>{
    return this.lessonService.updateById(id, lesson);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  deleteLessonById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ){
    return this.lessonService.deleteById(id);
  }

  @Get('questionsOf/:id')
  getAllExamOfLesson(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<ExamQuestion[]>{
    return this.lessonService.questionsOf(id);
  }
}
