import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EXAM_LESSON_MODEL, EXAM_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { ExamLesson } from 'src/modules/exam.lesson/exam.lesson.model';
import { Exam} from 'src/modules/exam/exam.model';
import { CreateExamDTO, UpdateExamDTO } from './exam.dto';
import { FILE_COURSE_INTRO, FILE_EXAM_THUMB, RESOURCE_TYPE_IMAGE } from 'src/constants/cloudinary.constants';
import { CloudinaryService } from 'src/processors/helper/helper.service.clouldinary';

@Injectable({ scope: Scope.REQUEST })
export class ExamService {
  constructor(
    @Inject(EXAM_MODEL) private examModel: Model<Exam>,
    @Inject(EXAM_LESSON_MODEL) private lessonModel: Model<ExamLesson>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
    private readonly cloudinaryService: CloudinaryService
  ){}

  async findAll(keyword?: string, category?: string, skip: number = 0, limit: number = 10): Promise<Exam[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }

    const query: any = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    return this.examModel.find(query)
    .select('-__v')
    .populate('category', '_id category')
    .skip(skip)
    .limit(limit)
    .exec();
  }

  async findById(id: string): Promise<Exam>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.examModel
      .findById(id)
      .populate('category', '_id category');

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
      throw new BadRequestException(`Failed to upload image: ${err}`);
    }
  }

  async updateById(id: string, data: UpdateExamDTO) {
    try{
      const fileImage = data.file;
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }

      const findOneExam = await this.examModel.findById(id);
      if(!findOneExam){
        throw new BadRequestException(`Exam is not found`);
      }

      if(fileImage){
        this.cloudinaryService.destroyFile(findOneExam.imagePublicId)
        const updateImage = await this.cloudinaryService.uploadFile(fileImage, FILE_EXAM_THUMB, fileImage.filename, RESOURCE_TYPE_IMAGE);
        data.imagePublicId = updateImage.public_id;
        data.imageUrl = updateImage.url;
      }

      const valueFind = await this.examModel.findByIdAndUpdate(id, data).setOptions({ new: true })

      if (!valueFind) {
        throw new NotFoundException();
      }
      console.log(valueFind);
      return valueFind;
    }catch(err){
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  deleteAll(): Promise<any>{
    return this.examModel.deleteMany({}).exec();
  }

  async deleteById(id: string){
    try{
      const isValidId = mongoose.isValidObjectId(id);
      if(!isValidId){
        throw new BadRequestException('Please enter correct id.');
      }

      const value = await this.examModel.findById(id)
      return this.softRemove(value)
    }catch(err){
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async softRemove(value: Exam){
    if(value.deleteAt != null){
      value.deleteAt = null;
    }else{
      value.deleteAt = new Date()
    }
    const deleted = await this.examModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true })
      
    return deleted
  }

  async lessonsOf(id: string): Promise<ExamLesson[]> {
    const objectId = new mongoose.Types.ObjectId(id);
    const lessons = await this.lessonModel.aggregate([
      {
        $match: {
          "exam": objectId,
        },
      },
      {
        $lookup: {
          from: 'ExamQuestions',
          localField: '_id',
          foreignField: 'lesson',
          as: 'questions',
        },
      },
    ]).exec();
    return lessons;
  }
}
