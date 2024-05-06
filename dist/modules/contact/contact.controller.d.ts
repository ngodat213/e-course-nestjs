import { Response } from 'express';
import { ContactService } from './contact.service';
import { Contact } from 'src/modules/contact/contact.model';
import { CreateContactDTO, UpdateContactDTO } from './contact.dto';
import { Observable } from 'rxjs';
export declare class ContactController {
    private contactSerivce;
    constructor(contactSerivce: ContactService);
    getAllContacts(keyword?: string, limit?: number, skip?: number): Promise<Contact[]>;
    getContactById(id: string): Promise<Contact>;
    createContact(contact: CreateContactDTO): Promise<Contact>;
    updateContact(id: string, contact: UpdateContactDTO, res: Response): Promise<Contact>;
    deleteContactById(id: string, res: Response): Observable<Response>;
}
