import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCourseOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly course: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly payment: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly paymentStatus: string;
}

export class UpdateCourseOrderDTO {
  @ApiProperty({ required: false })
  @IsOptional()  
  @IsMongoId()
  readonly user?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  readonly course?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly totalPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly payment?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly paymentStatus?: string;
}
