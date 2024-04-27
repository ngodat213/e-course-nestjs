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
    readonly time: string;
    readonly language: string;
    readonly teacher: {
        id: string;
    };
    readonly category: {
        id: string;
    };
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
    readonly time?: string;
    readonly language?: string;
    readonly updateAt?: Date;
    readonly createAt?: Date;
    readonly teacherId?: {
        id: string;
    };
    readonly category?: {
        id: string;
    };
}
