import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { EXAM_HISTORY_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';

@Injectable()
export class ExamHistoryService {
  constructor(
    @Inject(EXAM_HISTORY_MODEL) private historyModel: Model<ExamHistory>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keywordUser?: string, keywordExam?: string, skip: number = 0, limit: number = 10): Promise<ExamHistory[]> {
    if (keywordUser && keywordUser.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    if (keywordExam && keywordExam.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }

    const query: any = {};
    if (keywordUser) {
        query.user = { $regex: keywordUser, $options: 'i' };
    }
    if (keywordExam) {
        query.course = { $regex: keywordExam, $options: 'i' };
    }
    
    return this.historyModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<ExamHistory>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.historyModel.findById(id);
    if(!res){
      throw new NotFoundException('CourseOrder not found.');
    }
    return res;
  }

  async save(data: CreateExamHistoryDTO): Promise<ExamHistory> {
    const res = await this.historyModel.create({...data});
    return res;
  }


  async updateById(id: string, data: UpdateExamHistoryDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const update = await this.historyModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!update) {
      throw new NotFoundException();
    }
    return update;
  }
  
  async deleteById(id: string): Promise<ExamHistory>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = await this.historyModel.findByIdAndDelete(id)
    return res;
  }
}
