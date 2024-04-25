import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { COURSE_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseVideo } from 'src/models/course.video.model/course.video.model';
import { CreateCourseDTO, UpdateCourseDTO } from '../course/course.dto';
import { Model } from 'mongoose';
import { Course } from 'src/models/course.model/course.model';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';

@Injectable()
export class CourseVideoService {
  constructor(
    @Inject(COURSE_MODEL) private videoModel: Model<CourseVideo>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<CourseVideo[]>{
    if(keyword){
      return from(
        this.videoModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.videoModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<CourseVideo>{
    return from(this.videoModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p)=> (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }

  save(data: CreateCourseVideoDTO): Observable<CourseVideo>{
    const createCourse: Promise<CourseVideo> = this.videoModel.create({
      ...data,
      // createBy: {_id: this.req.user.id},
    });
    return from(createCourse);
  }

  update(id: string, data: UpdateCourseVideoDTO): Observable<CourseVideo>{
    return from(
      this.videoModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true},
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }

  deleteAll() : Observable<any>{
    return from(this.videoModel.deleteMany({}).exec());
  }

  deleteById(id: string) : Observable<CourseVideo>{
    return from(this.videoModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }
}
