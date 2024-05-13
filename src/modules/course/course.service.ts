import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { COURSE_LESSON_MODEL, COURSE_MODEL } from 'src/processors/database/database.constants';
import { Course } from 'src/modules/course/course.model';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseLesson } from 'src/modules/course.lesson/course.lesson.model';
import { FILE_COURSE_INTRO, FILE_COURSE_THUMB, RESOURCE_TYPE_IMAGE, RESOURCE_TYPE_VIDEO } from 'src/constants/cloudinary.constants';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';

@Injectable({ scope: Scope.REQUEST })
export class CourseService {
  constructor(
    @Inject(COURSE_MODEL) private courseModel: Model<Course>,
    @Inject(COURSE_LESSON_MODEL) private courseLessonModel: Model<CourseLesson>,
    private readonly cloudinaryService: CloudinaryService,
  ){}

  
  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<Course[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { title: { $regex: keyword, $options: 'i' } } : {};
    const res = await this.courseModel.find({...query}).select('-__v').skip(skip).limit(limit).exec()
    return res;
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

  async save(
    data: CreateCourseDTO, 
  ): Promise<Course> {
    const [fileImage, fileVideo] = data.files;
    const existing = await this.courseModel.findOne({ title: data.title });
    if (existing) {
      throw new BadRequestException('Course already exists');
    }

    try{
      const resultImage = await this.cloudinaryService.uploadFile(fileImage, FILE_COURSE_THUMB, fileImage.filename, RESOURCE_TYPE_IMAGE);
      const resultVideo = await this.cloudinaryService.uploadFile(fileVideo, FILE_COURSE_INTRO, fileVideo.fieldname, RESOURCE_TYPE_VIDEO);

      data.imagePublicId = resultImage.public_id;
      data.imageIntroduce = resultImage.url;
      data.videoIntroduce = resultVideo.public_id;
      data.videoPublicId = resultVideo.url;

      const res = await this.courseModel.create({...data});
      return res;
    } catch(err){
      console.log(`Faill error: ${err}`);
      throw new BadRequestException(`Failed to upload image: ${err}`);
    }
  }


  async updateById(id: string, data: UpdateCourseDTO) {
    try{
      const [fileImage, fileVideo] = data.files;
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }

      const findOneCourse = await this.courseModel.findById(id);
      if(!findOneCourse){
        throw new BadRequestException(`Course is not found`);
      }

      if(fileImage){
        this.cloudinaryService.destroyFile(findOneCourse.imagePublicId)
        const updateImage = await this.cloudinaryService.uploadFile(fileImage, FILE_COURSE_THUMB, fileImage.filename, RESOURCE_TYPE_IMAGE);
        data.imagePublicId = updateImage.public_id;
        data.imageIntroduce = updateImage.url;
      }

      if(fileVideo){
        this.cloudinaryService.destroyFile(findOneCourse.videoPublicId)
        const updateVideo = await this.cloudinaryService.uploadFile(fileVideo, FILE_COURSE_INTRO, fileVideo.fieldname, RESOURCE_TYPE_VIDEO);
        data.videoPublicId = updateVideo.public_id;
        data.videoIntroduce = updateVideo.url;
      }

      const valueFind = await this.courseModel.findByIdAndUpdate(id, data, { new: true })

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

  async deleteById(id: string){
    try{
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }

      const findOne = await this.courseModel.findById(id);

      if(findOne.imagePublicId){
        this.cloudinaryService.destroyFile(findOne.imagePublicId);
      }

      const valueFind = await this.courseModel.findByIdAndDelete({_id: id})
      if(!valueFind){
        throw `Course '${id}' not found`
      }
      return valueFind;
    }catch(err){
      console.log(err);
      throw new BadRequestException(err);
    }
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
