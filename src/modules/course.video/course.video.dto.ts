import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsObject, IsUrl, IsInt } from 'class-validator';
import { ApiFile } from 'src/decorators/api.file.decorator';

export class CreateCourseVideoDTO {
  @ApiProperty()
  @IsNotEmpty()  
  @Type(() => Number)
  @IsInt()
  readonly part: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly hour: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly minute: number;

  @IsString()
  @IsUrl()
  @IsOptional()
  videoUrl: string;

  @IsString()
  @IsOptional()
  videoPublicId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lesson: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
}

export class UpdateCourseVideoDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly part?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly hour?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly minute?: number;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  videoPublicId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly lesson?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
}