import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EMPTY, Observable, from, map, mergeMap, of, throwIfEmpty } from 'rxjs';
import { CATEGORY_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Category } from 'src/modules/category/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { query } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CategoryService {
  constructor(
    @Inject(CATEGORY_MODEL) private categoryModel: Model<Category>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<Category[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { category: { $regex: keyword, $options: 'i' } } : {};

    return this.categoryModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Category>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.categoryModel.findById(id);
    if(!res){
      throw new NotFoundException('Category not found.');
    }
    return res;
  }

  async save(data: CreateCategoryDTO): Promise<Category> {
    const existingCategory = await this.categoryModel.findOne({ category: data.category });
    if (existingCategory) {
        throw new BadRequestException('Category already exists');
    }

    const res = await this.categoryModel.create({...data});
    return res;
}


  async updateById(id: string, category: UpdateCategoryDTO): Promise<Category>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.categoryModel.findByIdAndUpdate(id, category,{
      new: true,
      runValidators: true
    });
  }
  
  async deleteById(id: string): Promise<Category>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = await this.categoryModel.findByIdAndDelete(id)
    return res;
  }
}
