import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { EXAM_QUESTION_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';

@Injectable({ scope: Scope.REQUEST })
export class ExamQuestionService {
  constructor(
    @Inject(EXAM_QUESTION_MODEL) private questionModel: Model<ExamQuestion>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<ExamQuestion[]>{
    if(keyword){
      return from(
        this.questionModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.questionModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<ExamQuestion>{
    return from(this.questionModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p)=> (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }

  save(data: CreateExamQuestionDTO): Observable<ExamQuestion>{
    const createQuestion: Promise<ExamQuestion> = this.questionModel.create({
      ...data,
      // createBy: {_id: this.req.user.id},
    });
    return from(createQuestion);
  }

  update(id: string, data: UpdateExamQuestionDTO): Observable<ExamQuestion>{
    return from(
      this.questionModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true},
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`question: $id was not found`)),
    );
  }

  deleteAll() : Observable<any>{
    return from(this.questionModel.deleteMany({}).exec());
  }

  deleteById(id: string) : Observable<ExamQuestion>{
    return from(this.questionModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`question: $id was not found`)),
    );
  }
}
