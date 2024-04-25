import { IsNotEmpty, IsNumber, IsString, IsOptional, IsObject, IsUrl } from 'class-validator';

export class CreateCourseVideoDTO {
  @IsNotEmpty()
  @IsString()
  readonly part: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly hour: number;

  @IsNotEmpty()
  @IsNumber()
  readonly minute: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly videoUrl: string;

  @IsNotEmpty()
  @IsString()
  readonly videoPublicId: string;

  @IsOptional()
  @IsObject()
  readonly lesson?: { id: string }; // Assuming lesson is an object with an id property
}

export class UpdateCourseVideoDTO {
  @IsOptional()
  @IsString()
  readonly part?: number;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly hour?: number;

  @IsOptional()
  @IsNumber()
  readonly minute?: number;

  @IsOptional()
  @IsString()
  readonly videoUrl?: string;

  @IsOptional()
  @IsString()
  readonly videoPublicId?: string;

  @IsOptional()
  @IsObject()
  readonly lesson?: { id: string }; // Assuming lesson is an object with an id property
}