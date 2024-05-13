export declare class CreateExamLessonDTO {
    readonly title: string;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly selection: number;
    readonly point: number;
    readonly exam: string;
}
export declare class UpdateExamLessonDTO {
    readonly title?: string;
    readonly hour?: number;
    readonly minute?: number;
    readonly second?: number;
    readonly selection?: number;
    readonly point?: number;
    readonly exam?: string;
}
