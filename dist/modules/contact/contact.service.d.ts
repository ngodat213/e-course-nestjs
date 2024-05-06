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
import { Contact } from 'src/modules/contact/contact.model';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
export declare class ContactService {
    private contactModel;
    private req;
    constructor(contactModel: Model<Contact>, req: AuthenticatedRequest);
    findAll(keyword?: string, skip?: number, limit?: number): Promise<Contact[]>;
    findById(id: string): Promise<Contact>;
    save(data: CreateContactDTO): Promise<Contact>;
    updateById(id: string, category: UpdateContactDTO): Promise<Contact>;
    deleteById(id: string): Observable<Contact>;
}
