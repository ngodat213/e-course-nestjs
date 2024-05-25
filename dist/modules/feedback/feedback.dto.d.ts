export declare class CreateFeedbackDTO {
    readonly user: string;
    readonly course: string;
    readonly title: string;
    readonly rating: number;
}
declare const UpdateFeedbackDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFeedbackDTO>>;
export declare class UpdateFeedbackDTO extends UpdateFeedbackDTO_base {
    readonly userId?: string;
    readonly courseId?: string;
    readonly title?: string;
    readonly rating?: number;
}
export {};
