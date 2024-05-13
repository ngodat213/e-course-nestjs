import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsObject, IsOptional } from 'class-validator';

export class CreateExamLessonDTO {
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
  @IsNumber()
  readonly second: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly selection: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly point: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly exam: string;
}

export class UpdateExamLessonDTO {
  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsNumber()
  readonly hour?: number;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsNumber()
  readonly minute?: number;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsNumber()
  readonly second?: number;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsNumber()
  readonly selection?: number;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsNumber()
  readonly point?: number;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly exam?: string;
}
