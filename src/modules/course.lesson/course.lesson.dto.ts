import { IsNotEmpty, IsNumber, IsString, IsObject, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseLessonDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly selection: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly course: string;
}

export class UpdateCourseLessonDTO{
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly selection?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly course?: string;
}