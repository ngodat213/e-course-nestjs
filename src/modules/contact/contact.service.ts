import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import mongoose, { Model } from 'mongoose';
import { EMPTY, Observable, from, mergeMap, of, throwIfEmpty } from 'rxjs';
import { CONTACT_MODEL } from 'src/processors/database/database.constants';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Contact } from 'src/modules/contact/contact.model';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';

@Injectable({ scope: Scope.REQUEST })
export class ContactService {
  constructor(
    @Inject(CONTACT_MODEL) private contactModel: Model<Contact>,
    @Inject(REQUEST) private req: AuthenticatedRequest,
  ){}

  async findAll(keyword?: string, skip: number = 0, limit: number = 10): Promise<Contact[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
  }
    const query = keyword? 
        { topic: { $regex: keyword, $options: 'i' } } : {};

    return this.contactModel.find({...query}).select('-__v').skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Contact>{
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const res = this.contactModel.findById(id);
    if(!res){
      throw new NotFoundException('Contact not found.');
    }
    return res;
  }

  async save(data: CreateContactDTO): Promise<Contact> {
    const res = await this.contactModel.create({...data});
    return res;
  }


  async updateById(id: string, data: UpdateContactDTO) {
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const post = await this.contactModel
      .findByIdAndUpdate(id, data)
      .setOptions({ overwrite: true, new: true })
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  
  async deleteById(id: string){
    const isValidId = mongoose.isValidObjectId(id);
    if(!isValidId){
      throw new BadRequestException('Please enter correct id.');
    }

    const valueFind = await this.contactModel.findByIdAndDelete({_id: id})
    if(!valueFind){
      throw `Contact '${id}' not found`
    }
    return valueFind;
  }
}
