import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateExamDTO implements IDTO {
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly imageUrl: string;
}
export declare class UpdateExamDTO {
    readonly title?: string;
    readonly description?: string;
    readonly category?: string;
    readonly imageUrl?: string;
}
