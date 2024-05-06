import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EXAM_LESSON_MODEL, EXAM_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { Exam} from 'src/modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class ExamService {
  constructor(
    @Inject(EXAM_MODEL) private examModel: Model<Exam>,
    @Inject(EXAM_LESSON_MODEL) private lessonModel: Model<ExamLesson>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<Exam[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { title: { $regex: keyword, $options: 'i' } } : {};

    return this.examModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Exam>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.examModel.findById(id);

    if(!res){
      throw new NotFoundException('Exam not found.');
    }
    
    return res;
  }

  async save(data: CreateExamDTO): Promise<Exam> {
    const existing = await this.examModel.findOne({ title: data.title });

    if (existing) {
        throw new BadRequestException('Exam already exists');
    }

    const res = await this.examModel.create({...data});
    return res;
}


  async updateById(id: string, exam: UpdateExamDTO): Promise<Exam>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }
    return await this.examModel.findByIdAndUpdate(id, exam,{
      new: true,
      runValidators: true
    });
  }

  deleteAll(): Promise<any>{
    return this.examModel.deleteMany({}).exec();
  }

  deleteById(id: string): Observable<Exam>{
    return from(this.examModel.findByIdAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`exam: $id was not found`)),
    )
  }

  lessonsOf(id: string): Promise<ExamLesson[]> {
    const lessons = this.lessonModel
    .find({
      Exam: {_id: id},
    })
    .select('-exam')
    .exec();
    return lessons;
  }
}
