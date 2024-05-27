import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EXAM_LESSON_MODEL, EXAM_QUESTION_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { CreateExamLessonDTO, UpdateExamLessonDTO } from './exam.lesson.dto';

@Injectable({ scope: Scope.REQUEST })
export class ExamLessonService {
  constructor(
    @Inject(EXAM_LESSON_MODEL) private lessonModel: Model<ExamLesson>,
    @Inject(EXAM_QUESTION_MODEL) private questionModel: Model<ExamQuestion>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<ExamLesson[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }

    const query: any = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }

    return this.lessonModel.find(query)
    .select('-__v')
    .skip(skip)
    .limit(limit)
    .exec();
  }

  async findById(id: string): Promise<ExamLesson>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.lessonModel.findById(id);
    if(!res){
      throw new NotFoundException('Exam lesson not found.');
    }
    return res;
  }

  async save(data: CreateExamLessonDTO): Promise<ExamLesson> {
    const existing = await this.lessonModel.findOne({ title: data.title });

    if (existing) {
        throw new BadRequestException('Exam lesson already exists');
    }

    const existingSelection = await this.lessonModel.findOne({ selection: data.selection });

    if (existingSelection) {
        throw new BadRequestException('Selection already exists');
    }

    const res = await this.lessonModel.create({...data});
    return res;
  }


  async updateById(id: string, data: UpdateExamLessonDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const existingSelection = await this.lessonModel.findOne({ selection: data.selection });

    if (existingSelection) {
      if(existingSelection.id != id){
        throw new BadRequestException('Selection already exists');
      }
    }

    const updated = await this.lessonModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!updated) {
      throw new NotFoundException();
    }
    return updated;
  }

  async deleteById(id: string){
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const value = await this.lessonModel.findById(id)
    return this.softRemove(value)
  }

  async softRemove(value: ExamLesson){
    if(value.deleteAt != null){
      value.deleteAt = null;
    }else{
      value.deleteAt = new Date()
    }
    const deleted = await this.lessonModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true })
      
    return deleted
  }

  questionsOf(id: string): Promise<ExamQuestion[]> {
    const lessons = this.questionModel
    .find({
      lesson: {_id: id}
    })
    .select('-exam')
    .exec();
    return lessons;
  }
}
