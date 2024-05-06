import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { COURSE_LESSON_MODEL, COURSE_VIDEO_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class CourseLessonService {
  constructor(
    @Inject(COURSE_LESSON_MODEL) private lessonModel: Model<CourseLesson>,
    @Inject(COURSE_VIDEO_MODEL) private videoModel: Model<CourseVideo>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<CourseLesson[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { title: { $regex: keyword, $options: 'i' } } : {};

    return this.lessonModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<CourseLesson>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.lessonModel.findById(id);
    if(!res){
      throw new NotFoundException('CourseLesson not found.');
    }
    return res;
  }

  async save(data: CreateCourseLessonDTO): Promise<CourseLesson> {
    const existing = await this.lessonModel.findOne({ title: data.title });

    if (existing) {
        throw new BadRequestException('CourseLesson already exists');
    }

    const res = await this.lessonModel.create({...data});
    return res;
}


  async updateById(id: string, courseLesson: UpdateCourseLessonDTO): Promise<CourseLesson>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }
    return await this.lessonModel.findByIdAndUpdate(id, courseLesson,{
      new: true,
      runValidators: true
    });
  }

  deleteById(id: string): Observable<CourseLesson>{
    return from(this.lessonModel.findByIdAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`lesson: $id was not found`)),
    )
  }

  lessonsOf(id: string): Promise<CourseVideo[]> {
    const lessons = this.videoModel
    .find({
      lesson: {_id: id},
    })
    .select('-course')
    .exec();
    return lessons;
  }
}