import { IsString, IsEmail, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class CreateContactDTO {
  @IsString()
  fullName: string;

  @IsEmail()
  mail: string;

  @IsString()
  text: string;

  @IsString()
  topic: string;
}

export class UpdateContactDTO {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  mail?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsBoolean()
  watched?: boolean;
}
