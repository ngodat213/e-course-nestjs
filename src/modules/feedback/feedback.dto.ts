import { IsString, IsDate, IsNumber, IsOptional, IsMongoId } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFeedbackDTO {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly courseId: string;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly rating: number;
}

export class UpdateFeedbackDTO {
  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @IsOptional()
  @IsMongoId()
  readonly courseId?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly rating?: number;
}