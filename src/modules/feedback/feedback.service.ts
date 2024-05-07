import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { FEEDBACK_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Feedback } from 'src/modules/feedback/feedback.model';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from './feedback.dto';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';

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
  
  deleteById(id: string) : Observable<Feedback>{
    return from(this.feedbackModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`feedback: $id was not found`)),
    );
  }
}
