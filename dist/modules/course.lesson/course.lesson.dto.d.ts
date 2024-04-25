export declare class CreateCourseLessonDTO {
    readonly title: string;
    readonly selection: number;
    readonly course?: {
        id: string;
    };
}
export declare class UpdateCourseLessonDTO {
    readonly title?: string;
    readonly selection?: number;
    readonly course?: {
        id: string;
    };
}
