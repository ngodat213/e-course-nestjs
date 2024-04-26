import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { COURSE_LESSON_MODEL, COURSE_VIDEO_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated.request.interface';
import { CourseLesson } from 'src/models/course.lesson.model/course.lesson.model';
import { CourseVideo } from 'src/models/course.video.model/course.video.model';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';

@Injectable({ scope: Scope.REQUEST })
export class CourseLessonService {
  constructor(
    @Inject(COURSE_LESSON_MODEL) private lessonModel: Model<CourseLesson>,
    @Inject(COURSE_VIDEO_MODEL) private videoModel: Model<CourseVideo>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<CourseLesson[]>{
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

  findById(id: string): Observable<CourseLesson>{
    return from(this.lessonModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`lesson: $id was not found`)),
    );
  }

  save(data: CreateCourseLessonDTO): Observable<CourseLesson>{
    const createCourseLesson: Promise<CourseLesson> = this.lessonModel.create({
      ...data
    });
    return from(createCourseLesson);
  }

  update(id: string, data: UpdateCourseLessonDTO): Observable<CourseLesson>{
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
    return from(this.lessonModel.deleteMany({}).exec());
  }

  deleteById(id: string): Observable<CourseLesson>{
    return from(this.lessonModel.findByIdAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`lesson: $id was not found`)),
    )
  }

  videosOf(id: string): Observable<CourseVideo[]>{
    const videos = this.videoModel
    .find({
      lesson: {_id: id}
    })
    .select('-lesson')
    .exec();
    return from(videos)
  }
}