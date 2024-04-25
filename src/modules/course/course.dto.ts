import { IsNotEmpty, IsNumber, IsString, IsDate, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly rating?: number = 5; // Default value set to 5

  @IsNotEmpty()
  @IsNumber()
  readonly register?: number = 0;

  @IsNotEmpty()
  @IsString()
  readonly imageIntroduce: string;

  @IsNotEmpty()
  @IsString()
  readonly imagePublicId: string;

  @IsNotEmpty()
  @IsString()
  readonly videoIntroduce: string;

  @IsNotEmpty()
  @IsString()
  readonly videoPublicId: string;

  @IsNotEmpty()
  @IsString()
  readonly time: string;

  @IsNotEmpty()
  @IsString()
  readonly language: string;

  @IsNotEmpty()
  @IsObject()
  readonly teacher: { id: string };

  @IsNotEmpty()
  @IsObject()
  readonly category: { id: string };
}

export class UpdateCourseDTO {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly rating?: number;

  @IsOptional()
  @IsNumber()
  readonly register?: number;

  @IsOptional()
  @IsString()
  readonly imageIntroduce?: string;

  @IsOptional()
  @IsString()
  readonly imagePublicId?: string;

  @IsOptional()
  @IsString()
  readonly videoIntroduce?: string;

  @IsOptional()
  @IsString()
  readonly videoPublicId?: string;

  @IsOptional()
  @IsString()
  readonly time?: string;

  @IsOptional()
  @IsString()
  readonly language?: string;

  @IsOptional()
  @IsDate()
  readonly updateAt?: Date;

  @IsOptional()
  @IsDate()
  readonly createAt?: Date;

  @IsOptional()
  @IsObject()
  readonly teacherId?: { id: string };

  @IsOptional()
  @IsObject()
  readonly category?: { id: string };
}



