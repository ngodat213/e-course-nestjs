import { IsDate, IsNumber, IsString, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCourseOrderDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly user: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly course: string;

  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;

  @IsNotEmpty()
  @IsString()
  readonly payment: string;

  @IsNotEmpty()
  @IsString()
  readonly paymentStatus: string;
}

export class UpdateCourseOrderDTO {
  @IsOptional()
  @IsMongoId()
  readonly user?: string;

  @IsOptional()
  @IsMongoId()
  readonly course?: string;

  @IsOptional()
  @IsNumber()
  readonly totalPrice?: number;

  @IsOptional()
  @IsString()
  readonly payment?: string;

  @IsOptional()
  @IsString()
  readonly paymentStatus?: string;
}
