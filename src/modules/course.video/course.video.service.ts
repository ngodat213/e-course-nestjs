import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { COURSE_VIDEO_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import mongoose, { Model } from 'mongoose';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { FILE_COURSE_INTRO, RESOURCE_TYPE_VIDEO } from 'src/constants/cloudinary.constants';
import { CloudinaryService } from 'src/processors/helper/helper.clouldinary';

@Injectable({ scope: Scope.REQUEST })
export class CourseVideoService {
  constructor(
    @Inject(COURSE_VIDEO_MODEL) private videoModel: Model<CourseVideo>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
    private readonly cloudinaryService: CloudinaryService
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
    const fileVideo = data.file;
    const existing = await this.videoModel.findOne({ title: data.title });
    if (existing) {
        throw new BadRequestException('Course already exists');
    }

    try{
      const resultVideo = await this.cloudinaryService.uploadFile(data.file, FILE_COURSE_INTRO, fileVideo.fieldname, RESOURCE_TYPE_VIDEO);

      data.videoUrl = resultVideo.url;
      data.videoPublicId = resultVideo.public_id;

      const res = await this.videoModel.create({...data});
      return res;
    }catch(err){
      console.log(`Faill error: ${err}`);
      throw new Error(`Failed to upload image: ${err}`);
    }
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
