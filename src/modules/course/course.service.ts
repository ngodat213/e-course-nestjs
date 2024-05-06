import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, map, mergeMap, of, throwError, throwIfEmpty } from 'rxjs';
import { COURSE_LESSON_MODEL, COURSE_MODEL, USER_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Course } from 'src/modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { User } from '../user/user.model';

@Injectable({ scope: Scope.REQUEST })
export class CourseService {
  constructor(
    @Inject(COURSE_MODEL) private courseModel: Model<Course>,
    @Inject(USER_MODEL) private teacherModel: Model<User>,
    @Inject(COURSE_LESSON_MODEL) private courseLessonModel: Model<CourseLesson>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  exitsTeacher(userId: User): Observable<boolean>{
    return from(this.teacherModel.exists({_id: userId, roles: ['USER', 'TEACHER']}).exec()).pipe(
      map((exits) => !exits),
    );
  }

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<Course[]>{
    if(keyword){
      return from(
        this.courseModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.courseModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<Course>{
    return from(this.courseModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p)=> (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }

  save(data: CreateCourseDTO): Observable<Course>{
    const createCourse: Promise<Course> = this.courseModel.create({
      ...data,
      // createBy: {_id: this.req.user.id},
    });
    return from(createCourse);
  }

  update(id: string, data: UpdateCourseDTO): Observable<Course>{
    return from(
      this.courseModel
      .findOneAndUpdate(
        {_id: id},
        {...data,
          //  updateBy: {_id: this.req.user.id},
          },
        {new: true},
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`course: $id was not found`)),
    );
  }

  deleteAll() : Observable<any>{
    return from(this.courseModel.deleteMany({}).exec());
  }

  deleteById(id: string) : Observable<Course>{
    return from(this.courseModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`course: $id was not found`)),
    );
  }

  lessonsOf(id: string): Observable<CourseLesson[]> {
    const lessons = this.courseLessonModel
    .find({
      course: {_id: id},
    })
    .select('-course')
    .exec();
    return from(lessons);
  }
}
