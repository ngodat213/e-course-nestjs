export declare class CreateExamQuestionDTO {
    readonly question: string;
    readonly options: string[];
    readonly answer: number;
    readonly imageUrl: string;
    readonly exam?: string;
}
export declare class UpdateExamQuestionDTO {
    readonly question?: string;
    readonly options?: string[];
    readonly answer?: number;
    readonly imageUrl?: string;
    readonly lesson?: string;
}
