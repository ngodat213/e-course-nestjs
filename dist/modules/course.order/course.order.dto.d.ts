export declare class CreateCourseOrderDTO {
    readonly user: string;
    readonly course: string;
    readonly totalPrice: number;
    readonly payment: string;
    readonly paymentStatus: string;
}
export declare class UpdateCourseOrderDTO {
    readonly user?: string;
    readonly course?: string;
    readonly totalPrice?: number;
    readonly payment?: string;
    readonly paymentStatus?: string;
}
