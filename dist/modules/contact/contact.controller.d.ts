import { Response } from 'express';
import { ContactService } from './contact.service';
import { Contact } from 'src/modules/contact/contact.model';
import { Observable } from 'rxjs';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
export declare class ContactController {
    private contactSerivce;
    constructor(contactSerivce: ContactService);
    getAllContacts(keyword?: string, limit?: number, skip?: number): Observable<Contact[]>;
    getContactById(id: string): Observable<Contact>;
    createContact(contact: CreateContactDTO, res: Response): Observable<Response>;
    updateContact(id: string, contact: UpdateContactDTO, res: Response): Observable<Response>;
    deleteContactById(id: string, res: Response): Observable<Response>;
}
