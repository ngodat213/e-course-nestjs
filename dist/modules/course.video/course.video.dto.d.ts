export declare class CreateCourseVideoDTO {
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
export declare class UpdateCourseVideoDTO {
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
