import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDate, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateCourseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly imageIntroduce: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly imagePublicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly videoIntroduce: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly videoPublicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
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
}



