/// <reference types="multer" />
export declare class CreateExamDTO {
    readonly title: string;
    readonly description: string;
    readonly category: string;
    imageUrl: string;
    imagePublicId: string;
    file: Express.Multer.File;
}
export declare class UpdateExamDTO {
    readonly title?: string;
    readonly description?: string;
    readonly category?: string;
    readonly imageUrl?: string;
}
