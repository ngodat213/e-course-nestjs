export declare class CreateExamQuestionDTO {
    readonly question: string;
    readonly options: string[];
    readonly answer: number;
    readonly imageUrl: string;
    readonly exam?: {
        id: string;
    };
}
export declare class UpdateExamQuestionDTO {
    readonly question?: string;
    readonly options?: string[];
    readonly answer?: number;
    readonly imageUrl?: string;
    readonly lesson?: {
        id: string;
    };
}
