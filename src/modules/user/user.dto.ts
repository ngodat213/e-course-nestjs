import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { RoleType } from "src/shared/enum/role.type.enum";

export class RegisterDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8, { message: " The min length of password is 8 " })
    @MaxLength(20, { message: " The password can't accept more than 20 characters " })
    readonly password: string;
}

export class UserDto {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly roles?: RoleType[];
}