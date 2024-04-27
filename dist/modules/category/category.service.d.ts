/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.request.interface';
import { Category } from 'src/models/category.model/category.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
export declare class CategoryService {
    private categoryModel;
    private req;
    constructor(categoryModel: Model<Category>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Observable<Category[]>;
    findById(id: string): Observable<Category>;
    save(data: CreateCategoryDTO): Observable<Category>;
    update(id: string, data: UpdateCategoryDTO): Observable<Category>;
    deleteAll(): Observable<any>;
    deleteById(id: string): Observable<Category>;
}
