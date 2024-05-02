import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { RoleType } from 'src/shared/enum/role.type.enum';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8, { message: "The min length of password is 8" })
    @MaxLength(20, { message: "The password can't accept more than 20 characters" })
    readonly password: string;
}

export class UserDto {
    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty({ type: RoleType, isArray: true, required: false }) // For optional properties
    readonly roles?: RoleType[];
}

export class ChangePasswordDTO {
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly oldPw: string;

    @ApiProperty()
    readonly newPw: string;
}
