import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { CONTACT_MODEL } from 'src/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Contact } from 'src/modules/contact/contact.model';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';

@Injectable({ scope: Scope.REQUEST })
export class ContactService {
  constructor(
    @Inject(CONTACT_MODEL) private contactModel: Model<Contact>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  findAll(keyword?: string, skip = 0, limit = 10) : Observable<Contact[]>{
    if(keyword){
      return from(
        this.contactModel
        .find({title: {$regex: '.*' + keyword + '.*'}})
        .skip(skip)
        .limit(limit)
        .exec()
      );
    }else{
      from(this.contactModel.find({}).skip(skip).limit(limit).exec());
    }
  }

  findById(id: string): Observable<Contact>{
    return from(this.contactModel.findOne({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`contact: $id was not found`)),
    );
  }

  save(data: CreateContactDTO): Observable<Contact>{
    const createContact: Promise<Contact> = this.contactModel.create({
      ...data
    });
    return from(createContact);
  }

  update(id: string, data: UpdateContactDTO): Observable<Contact>{
    return from(
      this.contactModel
      .findOneAndUpdate(
        {_id: id},
        {...data, updateBy: {_id: this.req.user.id}},
        {new: true}
      )
      .exec(),
    ).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`contact: $id was not found`)),
    );
  }

  deleteAll(): Observable<any>{
    return from(this.contactModel.deleteMany({}).exec());
  }

  deleteById(id: string): Observable<Contact>{
    return from(this.contactModel.findByIdAndDelete({_id: id}).exec()).pipe(
      mergeMap((p) => (p ? of(p): EMPTY)),
      throwIfEmpty(() => new NotFoundException(`contact: $id was not found`)),
    )
  }
}
