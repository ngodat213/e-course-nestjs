import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { EXAM_LESSON_MODEL, EXAM_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/models/exam.lesson.model/exam.lesson.model';
import { Exam} from 'src/models/exam.model/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';

@Injectable({ scope: Scope.REQUEST })
export class ExamService {
  constructor(
    @Inject(EXAM_MODEL) private examModel: Model<Exam>,
    @Inject(EXAM_LESSON_MODEL) private lessonModel: Model<ExamLesson>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<Exam[]>{
    if(keyword){
      return from(
        this.examModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec()
      );
    }else{
      from(this.lessonModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<Exam>{
    return from(this.examModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`lesson: $id was not found`)),
    );
  }

  save(data: CreateExamDTO): Observable<Exam>{
    const createExam: Promise<Exam> = this.examModel.create({
      ...data
    });
    return from(createExam);
  }

  update(id: string, data: UpdateExamDTO): Observable<Exam>{
    return from(
      this.examModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true}
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`exam: $id was not found`)),
    );
  }

  deleteAll(): Observable<any>{
    return from(this.examModel.deleteMany({}).exec());
  }

  deleteById(id: string): Observable<Exam>{
    return from(this.examModel.findByIdAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`exam: $id was not found`)),
    )
  }

  lessonsOf(id: string): Observable<ExamLesson[]>{
    const lessons = this.lessonModel
    .find({
      exam: {_id: id}
    })
    .select('-exam')
    .exec();
    return from(lessons)
  }
}
