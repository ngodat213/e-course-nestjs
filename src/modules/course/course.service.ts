import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
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

  
  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<Course[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { title: { $regex: keyword, $options: 'i' } } : {};

    return this.courseModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Course>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.courseModel.findById(id);

    if(!res){
      throw new NotFoundException('Course not found.');
    }
    
    return res;
  }

  async save(data: CreateCourseDTO): Promise<Course> {
    const existing = await this.courseModel.findOne({ title: data.title });

    if (existing) {
        throw new BadRequestException('Course already exists');
    }

    const res = await this.courseModel.create({...data});
    return res;
}


  async updateById(id: string, Course: UpdateCourseDTO): Promise<Course>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }
    return await this.courseModel.findByIdAndUpdate(id, Course,{
      new: true,
      runValidators: true
    });
  }

  deleteAll(): Promise<any>{
    return this.courseModel.deleteMany({}).exec();
  }

  deleteById(id: string) : Observable<Course>{
    return from(this.courseModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`course: $id was not found`)),
    );
  }

  lessonsOf(id: string): Promise<CourseLesson[]> {
    const lessons = this.courseLessonModel
    .find({
      course: {_id: id},
    })
    .select('-course')
    .exec();
    return lessons;
  }
}
