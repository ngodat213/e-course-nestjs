import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { ApiFile } from 'src/decorators/api.file.decorator';

export class CreateExamQuestionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly options: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly answer: number;

  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  imagePublicId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lesson: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
}

export class UpdateExamQuestionDTO {
  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly question?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly options?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  readonly answer?: number;

  @IsOptional()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  imagePublicId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly lesson?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
}
