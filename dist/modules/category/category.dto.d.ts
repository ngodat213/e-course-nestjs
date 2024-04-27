import { IDTO } from "src/interfaces/dto.interface";
export declare class CreateCategoryDTO implements IDTO {
    readonly title: string;
}
export declare class UpdateCategoryDTO implements IDTO {
    readonly title?: string;
}
