import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Scope } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FeedbackService } from './feedback.service';
import { Observable, map } from 'rxjs';
import { Feedback } from 'src/modules/feedback/feedback.model';
import { ParseObjectIdPipe } from 'src/shared/pipe/parse.object.id.pipe';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';

@ApiTags('Feedback')
@Controller({path: 'feedbacks', scope: Scope.REQUEST})
export class FeedbackController {
  constructor(private feedbackService: FeedbackService){}

  @Get('')
  getAllFeedbacks(
    @Query('q') keyword? :string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<Feedback[]>{
    return this.feedbackService.findAll(keyword, limit, skip);
  }

  @Get(':id')
  getFeedbackById(@Param('id', ParseObjectIdPipe)id : string) : Observable<Feedback>{
    return this.feedbackService.findById(id);
  }

  @Post('')
  createFeedback(
    @Body() feedback: CreateFeedbackDTO,
    @Res() res: Response,
  ): Observable<Response> {
    return this.feedbackService.save(feedback).pipe(
      map((feedback) => {
        return res
        .location('/feedbacks/' + feedback._id)
        .status(201)
        .send();
      }),
    );
  }

  @Put(':id')
  updateFeedback(
    @Param('id', ParseObjectIdPipe)id : string,
    @Body() ceedback: UpdateFeedbackDTO,
    @Res() res: Response,
  ) :Observable<Response>{
    return this.feedbackService.update(id, ceedback).pipe(
      map((feedback) => {
        return res.status(204).send();
      }),
    );
  }

  @Delete(':id')
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
