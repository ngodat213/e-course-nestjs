import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { ApiFile } from 'src/decorators/api.file.decorator';
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

export class UpdateUserDTO {
  @ApiProperty()
  @IsOptional()
  readonly username?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(8, { message: "The min length of password is 8" })
  readonly password?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  readonly photoUrl?: string;

  @ApiProperty()
  @IsOptional()
  readonly roles?: RoleType[];

  @ApiProperty()
  @IsOptional()
  readonly courses?: string;

  @ApiProperty()
  @IsOptional()
  readonly favouritesCourses?: string;

  @ApiProperty()
  @IsOptional()
  readonly favouritesExams?: string;

  @ApiProperty()
  @IsOptional()
  readonly finishedExams?: string;
}

export class ChangeAvatarDTO{
  @IsNotEmpty()
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
}

export class ResetPasswordDTO{
  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPasswordToken: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string
}

export class ChangePasswordDTO {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly oldPw: string;

  @ApiProperty()
  readonly newPw: string;
}
