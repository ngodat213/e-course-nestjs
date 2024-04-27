import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateExamLessonDTO implements IDTO {
    readonly title: string;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly selection: number;
    readonly point: number;
    readonly exam?: {
        id: string;
    };
}
export declare class UpdateExamLessonDTO implements IDTO {
    readonly title?: string;
    readonly hour?: number;
    readonly minute?: number;
    readonly second?: number;
    readonly selection?: number;
    readonly point?: number;
    readonly exam?: {
        id: string;
    };
}
