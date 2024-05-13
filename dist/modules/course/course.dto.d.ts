/// <reference types="multer" />
export declare class CreateCourseDTO {
    readonly title: string;
    readonly price: number;
    readonly description: string;
    readonly rating?: number;
    readonly register?: number;
    imageIntroduce: string;
    imagePublicId: string;
    videoIntroduce: string;
    videoPublicId: string;
    readonly time: number;
    readonly language: string;
    readonly teacher: string;
    readonly category: string;
    files: Express.Multer.File[];
}
export declare class UpdateCourseDTO {
    readonly title?: string;
    readonly price?: number;
    readonly description?: string;
    readonly rating?: number;
    readonly register?: number;
    imageIntroduce: string;
    imagePublicId: string;
    videoIntroduce: string;
    videoPublicId: string;
    readonly time?: number;
    readonly language?: string;
    readonly teacherId?: string;
    readonly category?: string;
    files: Express.Multer.File[];
}
