import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsInt } from 'class-validator';
import { ApiFile } from 'src/decorators/api.file.decorator';

export class CreateCourseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly rating?: number = 5; // Default value set to 5

  @IsNotEmpty()
  @IsNumber()
  readonly register?: number = 0;

  @IsString()
  @IsOptional()
  imageIntroduce: string;

  @IsString()
  @IsOptional()
  imagePublicId: string;

  @IsString()
  @IsOptional()
  videoIntroduce: string;

  @IsString()
  @IsOptional()
  videoPublicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly time: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly language: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly teacher: string ;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly category: string;

  @IsOptional()
  @ApiFile({ isArray: true })
  files: Express.Multer.File[];
}

export class UpdateCourseDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly rating?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly register?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly imageIntroduce?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly imagePublicId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly videoIntroduce?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly videoPublicId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly time?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly language?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly teacherId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ApiFile({ isArray: true })
  files: Express.Multer.File[];
}