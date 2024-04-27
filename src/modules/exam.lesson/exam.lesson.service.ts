import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { EXAM_LESSON_MODEL, EXAM_QUESTION_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';

@Injectable({ scope: Scope.REQUEST })
export class ExamLessonService {
  constructor(
    @Inject(EXAM_LESSON_MODEL) private lessonModel: Model<ExamLesson>,
    @Inject(EXAM_QUESTION_MODEL) private questionModel: Model<ExamQuestion>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<ExamLesson[]>{
    if(keyword){
      return from(
        this.lessonModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec()
      );
    }else{
      from(this.lessonModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<ExamLesson>{
    return from(this.lessonModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`lesson: $id was not found`)),
    );
  }

  save(data: CreateExamLessonDTO): Observable<ExamLesson>{
    const createExamLesson: Promise<ExamLesson> = this.lessonModel.create({
      ...data
    });
    return from(createExamLesson);
  }

  update(id: string, data: UpdateExamLessonDTO): Observable<ExamLesson>{
    return from(
      this.lessonModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true}
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`lesson: $id was not found`)),
    );
  }

  deleteAll(): Observable<any>{
    return from(this.questionModel.deleteMany({}).exec());
  }

  deleteById(id: string): Observable<ExamLesson>{
    return from(this.lessonModel.findByIdAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`lesson: $id was not found`)),
    )
  }

  questionsOf(id: string): Observable<ExamQuestion[]>{
    const questions = this.questionModel
    .find({
      lesson: {_id: id}
    })
    .select('-lesson')
    .exec();
    return from(questions)
  }
}
