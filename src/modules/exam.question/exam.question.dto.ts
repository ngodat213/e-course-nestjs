import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
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
  @IsNumber()
  readonly answer: number;

  @ApiProperty()
  @IsUrl()
  imageUrl: string;

  @IsString()
  @IsOptional()
  imagePublicId: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly exam?: string;

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

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsNumber()
  readonly answer?: number;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly lesson?: string;
}
