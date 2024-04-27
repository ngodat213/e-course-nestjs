import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateExamHistoryDTO implements IDTO {
    readonly userId: string;
    readonly examId: string;
    readonly point: Number;
}
export declare class UpdateExamHistoryDTO {
    readonly userId?: string;
    readonly examId?: string;
    readonly point?: Number;
}
