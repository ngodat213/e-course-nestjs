import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { COURSE_VIDEO_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { CourseVideo } from 'src/modules/course.video/course.video.model';
import mongoose, { Model } from 'mongoose';
import { CreateCourseVideoDTO, UpdateCourseVideoDTO } from './course.video.dto';
import { FILE_COURSE_VIDEO, RESOURCE_TYPE_VIDEO } from 'src/constants/cloudinary.constants';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';

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
        throw new BadRequestException('Course video already exists');
    }

    const existingSelection = await this.videoModel.findOne({ part: data.part , lesson: data.lesson});

    if (existingSelection) {
        throw new BadRequestException('Part already exists');
    }

    try{
      const resultVideo = await this.cloudinaryService.uploadFile(data.file, FILE_COURSE_VIDEO, fileVideo.fieldname, RESOURCE_TYPE_VIDEO);

      data.videoUrl = resultVideo.url;
      data.videoPublicId = resultVideo.public_id;

      const res = await this.videoModel.create({...data});
      return res;
    }catch(err){
      console.log(`Faill error: ${err}`);
      throw new BadRequestException(`Failed to upload image: ${err}`);
    }
  }

  async updateById(id: string, data: UpdateCourseVideoDTO) {
    try{
      const fileVideo = data.file;
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }
      
      const findOneVideo = await this.videoModel.findById(id);
      if(!findOneVideo){
        throw new BadRequestException(`Course video is not found`);
      }
      if(data.part != null){
        const existingSelection = await this.videoModel.findOne({ part: data.part });

        if (existingSelection) {
          if(existingSelection.id != id){
            throw new BadRequestException('Part already exists');
          }
        }
      }


      if(fileVideo){
        this.cloudinaryService.destroyFile(findOneVideo.videoPublicId)
        const updateVideo = await this.cloudinaryService.uploadFile(fileVideo, FILE_COURSE_VIDEO, fileVideo.fieldname, RESOURCE_TYPE_VIDEO);
        data.videoPublicId = updateVideo.public_id;
        data.videoUrl = updateVideo.url;
      }

      const valueFind = await this.videoModel.findByIdAndUpdate(id, data).setOptions({ new: true })

      if (!valueFind) {
        throw new NotFoundException();
      }
      console.log(valueFind);
      return valueFind;
    }catch(err){
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async deleteById(id: string): Promise<CourseVideo>{
    try{
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }

      const value = await this.videoModel.findById(id)
      return this.softRemove(value)
    }catch(err){
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async softRemove(value: CourseVideo){
    if(value.deleteAt != null){
      value.deleteAt = null;
    }else{
      value.deleteAt = new Date()
    }
    const deleted = await this.videoModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true })
      
    return deleted
  }
}
