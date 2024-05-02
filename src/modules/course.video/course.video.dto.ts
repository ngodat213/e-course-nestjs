import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsObject, IsUrl } from 'class-validator';

export class CreateCourseVideoDTO {
  @ApiProperty()
  @IsNotEmpty()  
  @IsString()
  readonly part: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly hour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly minute: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly videoUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly videoPublicId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  readonly lesson?: { id: string }; // Assuming lesson is an object with an id property
}

export class UpdateCourseVideoDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly part?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly hour?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly minute?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly videoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly videoPublicId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  readonly lesson?: { id: string }; // Assuming lesson is an object with an id property
}