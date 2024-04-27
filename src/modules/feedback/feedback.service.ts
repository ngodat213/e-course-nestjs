import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { FEEDBACK_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Feedback } from 'src/models/feedback.model/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';

@Injectable({ scope: Scope.REQUEST })
export class FeedbackService {
  constructor(
    @Inject(FEEDBACK_MODEL) private feedbackModel: Model<Feedback>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<Feedback[]>{
    if(keyword){
      return from(
        this.feedbackModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.feedbackModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<Feedback>{
    return from(this.feedbackModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p)=> (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }

  save(data: CreateFeedbackDTO): Observable<Feedback>{
    const createQuestion: Promise<Feedback> = this.feedbackModel.create({
      ...data,
      // createBy: {_id: this.req.user.id},
    });
    return from(createQuestion);
  }

  update(id: string, data: UpdateFeedbackDTO): Observable<Feedback>{
    return from(
      this.feedbackModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true},
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`feedback: $id was not found`)),
    );
  }

  deleteAll() : Observable<any>{
    return from(this.feedbackModel.deleteMany({}).exec());
  }

  deleteById(id: string) : Observable<Feedback>{
    return from(this.feedbackModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`feedback: $id was not found`)),
    );
  }
}
