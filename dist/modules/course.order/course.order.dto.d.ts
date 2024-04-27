import { IDTO } from 'src/interfaces/dto.interface';
export declare class CreateCourseOrderDTO implements IDTO {
    readonly user: string;
    readonly course: string;
    readonly totalPrice: number;
    readonly payment: string;
    readonly paymentStatus: string;
}
export declare class UpdateCourseOrderDTO implements IDTO {
    readonly user?: string;
    readonly course?: string;
    readonly totalPrice?: number;
    readonly payment?: string;
    readonly paymentStatus?: string;
}
