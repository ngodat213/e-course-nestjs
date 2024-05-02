import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExamDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;
}

export class UpdateExamDTO {
  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly category?: string;

  @ApiProperty({ required: false }) // For optional properties
  @IsOptional()
  @IsString()
  readonly imageUrl?: string;
}
