/**
 * @file Mongoose & Model & Paginate interface
 * @module interface/mongoose
 * @author Surmon <https://github.com/surmon-china>
 */

import { DocumentType } from '@typegoose/typegoose'
import type { Model, Types } from 'mongoose'

export type MongooseDoc<T> = Omit<DocumentType<T>, '_id' | 'id'> & T & { _id: Types.ObjectId }

// https://mongoosejs.com/docs/api.html#model_Model.findById
// `The id is cast based on the Schema before sending the command.`
// https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
// `id «Object|Number|String» value of _id to query by.`
export type MongooseID = Types.ObjectId | string
export type MongooseObjectID = Types.ObjectId

export type WithID<T> = T & { _id: Types.ObjectId }