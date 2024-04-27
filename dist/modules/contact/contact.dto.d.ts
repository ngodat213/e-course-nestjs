import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateContactDTO implements IDTO {
    fullName: string;
    mail: string;
    text: string;
    topic: string;
}
export declare class UpdateContactDTO implements IDTO {
    fullName?: string;
    mail?: string;
    text?: string;
    topic?: string;
    watched?: boolean;
}
