export declare class CreateCourseDTO {
    readonly title: string;
    readonly price: number;
    readonly description: string;
    readonly rating?: number;
    readonly register?: number;
    readonly imageIntroduce: string;
    readonly imagePublicId: string;
    readonly videoIntroduce: string;
    readonly videoPublicId: string;
    readonly time: number;
    readonly language: string;
    readonly teacher: string;
    readonly category: string;
}
export declare class UpdateCourseDTO {
    readonly title?: string;
    readonly price?: number;
    readonly description?: string;
    readonly rating?: number;
    readonly register?: number;
    readonly imageIntroduce?: string;
    readonly imagePublicId?: string;
    readonly videoIntroduce?: string;
    readonly videoPublicId?: string;
    readonly time?: number;
    readonly language?: string;
    readonly teacherId?: string;
    readonly category?: string;
}
