import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateCourseVideoDTO implements IDTO {
    readonly part: number;
    readonly title: string;
    readonly hour: number;
    readonly minute: number;
    readonly videoUrl: string;
    readonly videoPublicId: string;
    readonly lesson?: {
        id: string;
    };
}
export declare class UpdateCourseVideoDTO implements IDTO {
    readonly part?: number;
    readonly title?: string;
    readonly hour?: number;
    readonly minute?: number;
    readonly videoUrl?: string;
    readonly videoPublicId?: string;
    readonly lesson?: {
        id: string;
    };
}
