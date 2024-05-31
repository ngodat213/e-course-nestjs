import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class CreateContactDTO {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  mail: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  topic: string;

  @IsBoolean()
  watched?: boolean = false;
}

export class UpdateContactDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  mail?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  topic?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  watched?: boolean;
}
