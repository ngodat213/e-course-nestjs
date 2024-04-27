import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateCourseLessonDTO implements IDTO {
    readonly title: string;
    readonly selection: number;
    readonly course?: {
        id: string;
    };
}
export declare class UpdateCourseLessonDTO implements IDTO {
    readonly title?: string;
    readonly selection?: number;
    readonly course?: {
        id: string;
    };
}
