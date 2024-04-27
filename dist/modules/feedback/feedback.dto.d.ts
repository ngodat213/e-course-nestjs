import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateFeedbackDTO implements IDTO {
    readonly userId: string;
    readonly courseId: string;
    readonly title: string;
    readonly rating: number;
}
export declare class UpdateFeedbackDTO implements IDTO {
    readonly userId?: string;
    readonly courseId?: string;
    readonly title?: string;
    readonly rating?: number;
}
