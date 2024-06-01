import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { EXAM_HISTORY_MODEL, EXAM_LESSON_MODEL, EXAM_QUESTION_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamHistory } from './exam.history.model';
import { CreateExamHistoryDTO, UpdateExamHistoryDTO } from './exam.history.dto';
import { ExamQuestion } from '../exam.question/exam.question.model';
import { ExamLesson } from '../exam.lesson/exam.lesson.model';

@Injectable()
export class ExamHistoryService {
  constructor(
    @Inject(EXAM_HISTORY_MODEL) private historyModel: Model<ExamHistory>,
    @Inject(EXAM_QUESTION_MODEL) private questionModel: Model<ExamQuestion>,
    @Inject(EXAM_LESSON_MODEL) private lessonModel: Model<ExamLesson>,
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

    const res = this.historyModel.findById(id).populate('correct').populate('questions');
    if(!res){
      throw new NotFoundException('CourseOrder not found.');
    }
    return res;
  }

  async save(data: CreateExamHistoryDTO) {
    const lesson = await this.lessonModel.findById(data.lesson);
    for (const element of data.examSubmit) {
      const question = await this.questionModel.findById(element.id);
      if (question.answer === element.answer) {
        data.correct.push(element.id);
      }
      data.questions.push(question.id);
    }
    data.point = data.correct.length * (lesson.point/ data.examSubmit.length);
    const res = await this.historyModel.create({...data});
    const populatedRes = await this.historyModel.findById(res._id).populate('correct').populate('questions');
    return populatedRes;
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

    const value = await this.historyModel.findById(id)
    return this.softRemove(value)
  }

  async softRemove(value: ExamHistory){
    if(value.deleteAt != null){
      value.deleteAt = null;
    }else{
      value.deleteAt = new Date()
    }
    const deleted = await this.historyModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true })
      
    return deleted
  }
}
