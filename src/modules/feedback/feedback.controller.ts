import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FeedbackService } from './feedback.service';
import { Observable, map } from 'rxjs';
import { Feedback } from 'src/modules/feedback/feedback.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleType } from 'src/shared/enum/role.type.enum';
import { HasRoles } from 'src/auth/guard/has-roles.decorator';

@ApiTags('Feedback')
@ApiBearerAuth()
@Controller({path: 'feedbacks', scope: Scope.REQUEST})
export class FeedbackController {
  constructor(private feedbackService: FeedbackService){}

  @Get('')
  @ApiQuery({ name: 'qUser', required: false })
  @ApiQuery({ name: 'qCourse', required: false })
  getAllFeedbacks(
    @Query('qUser')  keywordUser?: string,
    @Query('qCourse')  keywordCourse?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Promise<Feedback[]> {
    return this.feedbackService.findAll(keywordUser, keywordCourse, skip, limit);
  }

  
  @Get(':id')
  getFeedbackById(@Param('id', ParseObjectIdPipe)id : string) : Promise<Feedback>{
    return this.feedbackService.findById(id);
  }

  @Post('')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  createFeedback(
    @Body() value: CreateFeedbackDTO,
  ) {
    return this.feedbackService.save(value);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.TEACHER)
  @UseGuards(AuthGuard)
  updateFeedback(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() value: UpdateFeedbackDTO,
    @Res() res: Response, 
  ) :Promise<Feedback>{
    return this.feedbackService.updateById(id, value);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  deleteFeedbackById(
    @Param('id', ParseObjectIdPipe) id: string,
    @Res() res: Response,
  ): Observable<Response>{
    return this.feedbackService.deleteById(id).pipe(
      map((feedback) => {
        return res.status(204).send();
      }),
    );
  }
}
