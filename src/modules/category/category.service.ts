import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, map, mergeMap, of, throwIfEmpty } from 'rxjs';
import { CATEGORY_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Category } from 'src/modules/category/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';

@Injectable({ scope: Scope.REQUEST })
export class CategoryService {
  constructor(
    @Inject(CATEGORY_MODEL) private categoryModel: Model<Category>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  existByName(category: string){
    return this.categoryModel.exists({category: category}).exec();
  }

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<Category[]>{
    if(keyword){
      return from(
        this.categoryModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.categoryModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<Category>{
    return from(this.categoryModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`category: $id was not found`)),
    );
  }

  save(data: CreateCategoryDTO){
    if(this.existByName(data.category)){
      throw `Category: ${data.category} was existed`
    }else{
      const createExam = this.categoryModel.create({
        ...data
      });
      return createExam;
    }
  }

  update(id: string, data: UpdateCategoryDTO): Observable<Category>{
    return from(
      this.categoryModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true}
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`category: $id was not found`)),
    );
  }

  deleteAll(): Observable<any>{
    return from(this.categoryModel.deleteMany({}).exec());
  }

  deleteById(id: string): Observable<Category>{
    return from(this.categoryModel.findByIdAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`category: $id was not found`)),
    )
  }
}
