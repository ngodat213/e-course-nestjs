import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiFile } from 'src/decorators/api.file.decorator';

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

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  imagePublicId: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
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
