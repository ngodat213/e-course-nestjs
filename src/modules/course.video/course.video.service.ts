import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { COURSE_VIDEO_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import mongoose, { Model } from 'mongoose';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';

@Injectable({ scope: Scope.REQUEST })
export class CourseVideoService {
  constructor(
    @Inject(COURSE_VIDEO_MODEL) private videoModel: Model<CourseVideo>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<CourseVideo[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { title: { $regex: keyword, $options: 'i' } } : {};

    return this.videoModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<CourseVideo>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.videoModel.findById(id);

    if(!res){
      throw new NotFoundException('Course not found.');
    }
    
    return res;
  }

  async save(data: CreateCourseVideoDTO): Promise<CourseVideo> {
    const existing = await this.videoModel.findOne({ title: data.title });

    if (existing) {
        throw new BadRequestException('Course already exists');
    }

    const res = await this.videoModel.create({...data});
    return res;
  }

  async updateById(id: string, data: UpdateCourseVideoDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }
    
    const existingCategory = await this.videoModel.findOne({ title: data.title });
    if (existingCategory) {
        throw new BadRequestException('Category already exists');
    }

    const video = await this.videoModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!video) {
      throw new NotFoundException();
    }
    return video;
  }

  async deleteById(id: string): Promise<CourseVideo>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }
    const res = await this.videoModel.findByIdAndDelete(id)
    return res;
  }
}
