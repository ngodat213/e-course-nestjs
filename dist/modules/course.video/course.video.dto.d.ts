/// <reference types="multer" />
export declare class CreateCourseVideoDTO {
    readonly part: number;
    readonly title: string;
    readonly hour: number;
    readonly minute: number;
    videoUrl: string;
    videoPublicId: string;
    readonly lesson: string;
    file: Express.Multer.File;
}
export declare class UpdateCourseVideoDTO {
    readonly part?: number;
    readonly title?: string;
    readonly hour?: number;
    readonly minute?: number;
    videoUrl?: string;
    videoPublicId?: string;
    readonly lesson?: string;
    file: Express.Multer.File;
}
