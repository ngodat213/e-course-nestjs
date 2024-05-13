/// <reference types="multer" />
export declare class CreateExamQuestionDTO {
    readonly question: string;
    readonly options: string[];
    readonly answer: number;
    imageUrl: string;
    imagePublicId: string;
    readonly lesson: string;
    file: Express.Multer.File;
}
export declare class UpdateExamQuestionDTO {
    readonly question?: string;
    readonly options?: string[];
    readonly answer?: number;
    imageUrl: string;
    imagePublicId: string;
    readonly lesson?: string;
    file: Express.Multer.File;
}
