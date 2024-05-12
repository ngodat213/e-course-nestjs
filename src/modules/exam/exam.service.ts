import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EXAM_LESSON_MODEL, EXAM_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { Exam} from 'src/modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { FILE_COURSE_INTRO, RESOURCE_TYPE_IMAGE } from 'src/constants/cloudinary.constants';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';

@Injectable({ scope: Scope.REQUEST })
export class ExamService {
  constructor(
    @Inject(EXAM_MODEL) private examModel: Model<Exam>,
    @Inject(EXAM_LESSON_MODEL) private lessonModel: Model<ExamLesson>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
    private readonly cloudinaryService: CloudinaryService
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
    const fileImage = data.file;
    const existing = await this.examModel.findOne({ title: data.title });
    if (existing) {
        throw new BadRequestException('Exam already exists');
    }

    try{
      const resultImage = await this.cloudinaryService.uploadFile(fileImage, FILE_COURSE_INTRO, fileImage.fieldname, RESOURCE_TYPE_IMAGE);

      data.imageUrl = resultImage.url;
      data.imagePublicId = resultImage.public_id;

      const res = await this.examModel.create({...data});
      return res;
    }catch(err){
      console.log(`Faill error: ${err}`);
      throw new Error(`Failed to upload image: ${err}`);
    }
  }

  async updateById(id: string, data: UpdateExamDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const exam = await this.examModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!exam) {
      throw new NotFoundException();
    }
    return exam;
  }

  deleteAll(): Promise<any>{
    return this.examModel.deleteMany({}).exec();
  }

  async deleteById(id: string){
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const valueFind = await this.examModel.findByIdAndDelete({_id: id})
    if(!valueFind){
      throw `Exam '${id}' not found`
    }
    return valueFind;
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
