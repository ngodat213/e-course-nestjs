export declare class CreateFeedbackDTO {
    readonly userId: string;
    readonly courseId: string;
    readonly title: string;
    readonly rating: number;
}
export declare class UpdateFeedbackDTO {
    readonly userId?: string;
    readonly courseId?: string;
    readonly title?: string;
    readonly rating?: number;
}
