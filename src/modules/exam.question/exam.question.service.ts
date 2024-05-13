import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { EXAM_QUESTION_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamQuestion } from 'src/modules/exam.question/exam.question.model';
import { CreateExamQuestionDTO, UpdateExamQuestionDTO } from './exam.question.dto';
import { FILE_COURSE_INTRO, FILE_EXAM_QUESTION, RESOURCE_TYPE_IMAGE } from 'src/constants/cloudinary.constants';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';

@Injectable({ scope: Scope.REQUEST })
export class ExamQuestionService {
  constructor(
    @Inject(EXAM_QUESTION_MODEL) private questionModel: Model<ExamQuestion>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
    private readonly cloudinaryService: CloudinaryService
  ){}

  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<ExamQuestion[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { question: { $regex: keyword, $options: 'i' } } : {};

    return this.questionModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<ExamQuestion>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.questionModel.findById(id);

    if(!res){
      throw new NotFoundException('Question not found.');
    }
    
    return res;
  }

  async save(data: CreateExamQuestionDTO): Promise<ExamQuestion> {
    const fileImage = data.file;
    const existing = await this.questionModel.findOne({ question: data.question });

    if (existing) {
        throw new BadRequestException('Question already exists');
    }
    try{
      const resultImage = await this.cloudinaryService.uploadFile(data.file, FILE_EXAM_QUESTION, fileImage.fieldname, RESOURCE_TYPE_IMAGE);

      data.imageUrl = resultImage.url;
      data.imagePublicId = resultImage.public_id;
      
      const res = await this.questionModel.create({...data});
      return res;
    }catch(err){
      console.log(`Faill error: ${err}`);
      throw new Error(`Failed to upload image: ${err}`);
    }
  }

  async updateById(id: string, data: UpdateExamQuestionDTO) {
    try{
      const fileImage = data.file;
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }

      const findOneQuestion = await this.questionModel.findById(id);
      if(!findOneQuestion){
        throw new BadRequestException(`Question is not found`);
      }

      if(fileImage){
        this.cloudinaryService.destroyFile(findOneQuestion.imagePublicId)
        const updateImage = await this.cloudinaryService.uploadFile(fileImage, FILE_EXAM_QUESTION, fileImage.filename, RESOURCE_TYPE_IMAGE);
        data.imagePublicId = updateImage.public_id;
        data.imageUrl = updateImage.url;
      }

      const valueFind = await this.questionModel.findByIdAndUpdate(id, data, { new: true })

      if (!valueFind) {
        throw new NotFoundException();
      }
      console.log(valueFind);
      return valueFind;
    }catch(err){
      console.log(err);
      throw new Error(err);
    }
  }

  async deleteById(id: string){
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const findOne = await this.questionModel.findById(id);

      if(findOne.imagePublicId){
        this.cloudinaryService.destroyFile(findOne.imagePublicId);
      }

    const valueFind = await this.questionModel.findByIdAndDelete({_id: id})
    if(!valueFind){
      throw `Lesson '${id}' not found`
    }
    return valueFind;
  }
}
