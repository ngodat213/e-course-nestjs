import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { COURSE_MODEL, COURSE_ORDER_MODEL } from 'src/processors/database/database.constants';
import { CourseOrder } from './course.order.model';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import mongoose, { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';
import { Course} from '../course/course.model';

@Injectable({ scope: Scope.REQUEST })
export class CourseOrderService {
  constructor(
    @Inject(COURSE_ORDER_MODEL) private orderModel: Model<CourseOrder>,
    @Inject(COURSE_MODEL) private courseModel: Model<Course>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keywordUser?: string, keywordCourse?: string, skip: number = 0, limit: number = 10): Promise<CourseOrder[]> {
    if (keywordUser && keywordUser.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    if (keywordCourse && keywordCourse.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }

    const query: any = {};
    if (keywordUser) {
        query.user = { $regex: keywordUser, $options: 'i' };
    }
    if (keywordCourse) {
        query.course = { $regex: keywordCourse, $options: 'i' };
    }
    
    return this.orderModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<CourseOrder>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.orderModel.findById(id);
    if(!res){
      throw new NotFoundException('CourseOrder not found.');
    }
    return res;
  }

  async save(data: CreateCourseOrderDTO): Promise<CourseOrder> {
    const courseFindOne = await this.courseModel.findById(data.course);
    courseFindOne.register++;

    await this.courseModel.findByIdAndUpdate(courseFindOne);
    const res = await this.orderModel.create({...data});
    return res;
  }


  async updateById(id: string, data: UpdateCourseOrderDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const post = await this.orderModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  
  async deleteById(id: string){
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const value = await this.orderModel.findById(id)
    return this.softRemove(value)
  }

  async softRemove(value: CourseOrder){
    if(value.deleteAt != null){
      value.deleteAt = null;
    }else{
      value.deleteAt = new Date()
    }
    const deleted = await this.orderModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true })
      
    return deleted
  }
}
