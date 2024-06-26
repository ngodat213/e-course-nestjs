import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { COURSE_LESSON_MODEL, COURSE_VIDEO_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import { CreateCourseLessonDTO, UpdateCourseLessonDTO } from './course.lesson.dto';

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
    const existingTitle = await this.lessonModel.findOne({ title: data.title , course: data.course});

    if (existingTitle) {
        throw new BadRequestException('Title already exists');
    }

    const existingSelection = await this.lessonModel.findOne({ selection: data.selection, course: data.course });

    if (existingSelection) {
        throw new BadRequestException('Selection already exists');
    }

    const res = await this.lessonModel.create({...data});
    return res;
  }

  async updateById(id: string, data: UpdateCourseLessonDTO) {
    
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }
    
    const existingTitle = await this.lessonModel.findOne({ title: data.title, course: data.course });
    if (existingTitle) {
      throw new BadRequestException('Title already exists');
    }
    
    const existingSelection = await this.lessonModel.findOne({ selection: data.selection, course: data.course });
    
    if (existingSelection) {
      if(existingSelection.id != id){
        throw new BadRequestException('Selection already exists');
      }
    }

    const updateCourseLesson = await this.lessonModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!updateCourseLesson) {
      throw new NotFoundException();
    }
    return updateCourseLesson;
  }

  async deleteById(id: string){
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const value = await this.lessonModel.findById(id)
    return this.softRemove(value)
  }

  async softRemove(value: CourseLesson){
    if(value.deleteAt != null){
      value.deleteAt = null;
    }else{
      value.deleteAt = new Date()
    }
    const deleted = await this.lessonModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true })
      
    return deleted
  }

  videosOf(id: string): Promise<CourseVideo[]> {
    const lessons = this.videoModel
    .find({
      lesson: {_id: id},
    })
    .select('-course')
    .exec();
    return lessons;
  }
}