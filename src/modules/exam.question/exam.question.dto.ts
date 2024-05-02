import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

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
  readonly imageUrl: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsObject()
  readonly exam?: { id: string };
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
  @ValidateNested()
  readonly lesson?: { id: string };
}
