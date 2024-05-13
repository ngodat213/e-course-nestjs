/// <reference types="multer" />
export declare class CreateExamDTO {
    readonly title: string;
    readonly description: string;
    readonly category: string;
    imageUrl: string;
    imagePublicId: string;
    readonly file: Express.Multer.File;
}
export declare class UpdateExamDTO {
    readonly title?: string;
    readonly description?: string;
    readonly category?: string;
    imageUrl: string;
    imagePublicId: string;
    readonly file: Express.Multer.File;
}
