import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { EXAM_HISTORY_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';

@Injectable()
export class ExamHistoryService {
  constructor(
    @Inject(EXAM_HISTORY_MODEL) private historyModel: Model<ExamHistory>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<ExamHistory[]>{
    if(keyword){
      return from(
        this.historyModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.historyModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<ExamHistory>{
    return from(this.historyModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p)=> (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }

  save(data: CreateExamHistoryDTO): Observable<ExamHistory>{
    const createQuestion: Promise<ExamHistory> = this.historyModel.create({
      ...data,
      // createBy: {_id: this.req.user.id},
    });
    return from(createQuestion);
  }

  update(id: string, data: UpdateExamHistoryDTO): Observable<ExamHistory>{
    return from(
      this.historyModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true},
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`exam history: $id was not found`)),
    );
  }

  deleteAll() : Observable<any>{
    return from(this.historyModel.deleteMany({}).exec());
  }

  deleteById(id: string) : Observable<ExamHistory>{
    return from(this.historyModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`exam history: $id was not found`)),
    );
  }
}
