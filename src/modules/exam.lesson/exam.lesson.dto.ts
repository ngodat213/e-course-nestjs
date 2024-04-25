import { IsNotEmpty, IsNumber, IsString, IsObject, IsOptional } from 'class-validator';

export class CreateExamLessonDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly hour: number;

  @IsNotEmpty()
  @IsNumber()
  readonly minute: number;

  @IsNotEmpty()
  @IsNumber()
  readonly second: number;

  @IsNotEmpty()
  @IsNumber()
  readonly selection: number;

  @IsNotEmpty()
  @IsNumber()
  readonly point: number;

  @IsNotEmpty()
  @IsObject()
  readonly exam?: { id: string };
}

export class UpdateExamLessonDTO {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly hour?: number;

  @IsOptional()
  @IsNumber()
  readonly minute?: number;

  @IsOptional()
  @IsNumber()
  readonly second?: number;

  @IsOptional()
  @IsNumber()
  readonly selection?: number;

  @IsOptional()
  @IsNumber()
  readonly point?: number;

  @IsOptional()
  @IsObject()
  readonly exam?: { id: string };
}
