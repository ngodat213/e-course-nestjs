export declare class CreateExamHistoryDTO {
    readonly userId: string;
    readonly lesson: string;
    readonly examSubmit: ExamSubmit[];
    point?: number;
    correct?: string[];
    questions?: string[];
}
export declare class ExamSubmit {
    readonly id: string;
    readonly answer: Number;
}
export declare class UpdateExamHistoryDTO {
    readonly userId?: string;
    readonly lesson?: string;
    point: number;
    correct: number;
    incorrect: number;
}
