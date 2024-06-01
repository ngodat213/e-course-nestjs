import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { COURSE_MODEL, FEEDBACK_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Feedback } from 'src/modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { Course } from '../course/course.model';

@Injectable({ scope: Scope.REQUEST })
export class FeedbackService {
  constructor(
    @Inject(FEEDBACK_MODEL) private feedbackModel: Model<Feedback>,
    @Inject(COURSE_MODEL) private courseModel: Model<Course>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}
  
  async findAll(keywordUser?: string, keywordCourse?: string, skip: number = 0, limit: number = 10): Promise<Feedback[]> {
    if (keywordUser && keywordUser.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    if (keywordCourse && keywordCourse.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
  
    const query: any = {};
    if (keywordUser) {
      query.user = keywordUser
    }
    if (keywordCourse) {
      query.course = keywordCourse
    }
    
    return this.feedbackModel.find(query)
      .select('-__v')
      .skip(skip)
      .limit(limit)
      .populate('user', 'email username photoUrl') 
      .exec();
  }

  async findById(id: string): Promise<Feedback>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.feedbackModel
      .findById(id)
      .populate('user', 'email username photoUrl');
    if(!res){
      throw new NotFoundException('Category not found.');
    }
    return res;
  }

  async save(data: CreateFeedbackDTO): Promise<Feedback> {
    const courseFindOne = await this.courseModel.findById(data.course);
    
    if (!courseFindOne) {
        throw new Error("Course not found");
    }

    courseFindOne.rating = (courseFindOne.rating * courseFindOne.reviews + data.rating) / (courseFindOne.reviews + 1);
    courseFindOne.reviews++;

    await courseFindOne.save();

    const res = await this.feedbackModel.create({ ...data });

    return res;
  }

  async updateById(id: string, data: UpdateFeedbackDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const updated = await this.feedbackModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }
  
  async deleteById(id: string) {
    try{
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }

      const value = await this.feedbackModel.findById(id)
      return this.softRemove(value)
    }catch(err){
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async softRemove(value: Feedback){
    if(value.deleteAt != null){
      value.deleteAt = null;
    }else{
      value.deleteAt = new Date()
    }
    const deleted = await this.feedbackModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true })
      
    return deleted
  }
}
