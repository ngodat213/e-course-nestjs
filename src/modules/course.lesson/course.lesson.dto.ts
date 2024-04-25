import { IsNotEmpty, IsNumber, IsString, IsObject, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCourseLessonDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly selection: number;

  @IsNotEmpty()
  @IsObject()
  readonly course?: { id: string };
}

export class UpdateCourseLessonDTO{
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly selection?: number;

  @IsOptional()
  @IsObject()
  readonly course?: { id: string };
}