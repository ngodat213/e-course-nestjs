import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsObject, IsUrl } from 'class-validator';
import { ApiFile } from 'src/decorators/api.file.decorator';

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

  @IsString()
  @IsUrl()
  @IsOptional()
  videoUrl: string;

  @IsString()
  @IsOptional()
  videoPublicId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly lesson?: string; // Assuming lesson is an object with an id property

  @IsNotEmpty()
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
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
  @IsString()
  readonly lesson?: string ;
}