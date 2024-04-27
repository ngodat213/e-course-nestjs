import { RoleType } from "src/shared/enum/role.type.enum";
export declare class RegisterDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
}
export declare class UserDto {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly roles?: RoleType[];
}
export declare class ChangePasswordDTO {
    readonly email: string;
    readonly oldPw: string;
    readonly newPw: string;
}
