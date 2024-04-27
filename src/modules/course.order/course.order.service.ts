import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { COURSE_ORDER_MODEL } from 'src/database/database.constants';
import { CourseOrder } from './course.order.model';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { CreateCourseOrderDTO, UpdateCourseOrderDTO } from './course.order.dto';

@Injectable({ scope: Scope.REQUEST })
export class CourseOrderService {
  constructor(
    @Inject(COURSE_ORDER_MODEL) private orderModel: Model<CourseOrder>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<CourseOrder[]>{
    if(keyword){
      return from(
        this.orderModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec(),
      );
    }else{
      return from(this.orderModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<CourseOrder>{
    return from(this.orderModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p)=> (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`video: $id was not found`)),
    );
  }

  save(data: CreateCourseOrderDTO): Observable<CourseOrder>{
    const createQuestion: Promise<CourseOrder> = this.orderModel.create({
      ...data,
      // createBy: {_id: this.req.user.id},
    });
    return from(createQuestion);
  }

  update(id: string, data: UpdateCourseOrderDTO): Observable<CourseOrder>{
    return from(
      this.orderModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true},
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p? of(p) : EMPTY)),
      throwIfEmpty(() => new NotFoundException(`course order: $id was not found`)),
    );
  }

  deleteAll() : Observable<any>{
    return from(this.orderModel.deleteMany({}).exec());
  }

  deleteById(id: string) : Observable<CourseOrder>{
    return from(this.orderModel.findOneAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`course order: $id was not found`)),
    );
  }
}
