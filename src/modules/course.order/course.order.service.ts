import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { COURSE_ORDER_MODEL } from 'src/database/database.constants';
import { CourseOrder } from './course.order.model';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import mongoose, { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';

@Injectable({ scope: Scope.REQUEST })
export class CourseOrderService {
  constructor(
    @Inject(COURSE_ORDER_MODEL) private orderModel: Model<CourseOrder>,
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
    const res = await this.orderModel.create({...data});
    return res;
  }


  async updateById(id: string, courseOrder: UpdateCourseOrderDTO): Promise<CourseOrder>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.orderModel.findByIdAndUpdate(id, courseOrder,{
      new: true,
      runValidators: true
    });
  }
  
  async deleteById(id: string): Promise<CourseOrder>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = await this.orderModel.findByIdAndDelete(id)
    return res;
  }
}
