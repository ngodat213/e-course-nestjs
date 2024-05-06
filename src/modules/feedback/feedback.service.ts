import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { FEEDBACK_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Feedback } from 'src/modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';

@Injectable({ scope: Scope.REQUEST })
export class FeedbackService {
  constructor(
    @Inject(FEEDBACK_MODEL) private feedbackModel: Model<Feedback>,
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
        query.user = { $regex: keywordUser, $options: 'i' };
    }
    if (keywordCourse) {
        query.course = { $regex: keywordCourse, $options: 'i' };
    }
    
    return this.feedbackModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Feedback>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.feedbackModel.findById(id);
    if(!res){
      throw new NotFoundException('Category not found.');
    }
    return res;
  }

  async save(data: CreateFeedbackDTO): Promise<Feedback> {
    const res = await this.feedbackModel.create({...data});
    return res;
}


  async updateById(id: string, category: UpdateFeedbackDTO): Promise<Feedback>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.feedbackModel.findByIdAndUpdate(id, category,{
      new: true,
      runValidators: true
    });
  }
  
  async deleteById(id: string): Promise<Feedback>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = await this.feedbackModel.findByIdAndDelete(id)
    return res;
  }
}
