import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, IsOptional, IsMongoId } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateFeedbackDTO {
  @ApiProperty()
  @IsString()
  readonly user: string;

  @ApiProperty()
  @IsString()
  readonly course: string;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly rating: number;
}

export class UpdateFeedbackDTO extends PartialType(CreateFeedbackDTO) {
  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsMongoId()
  readonly courseId?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsNumber()
  readonly rating?: number;
}
