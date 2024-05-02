import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateExamHistoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()  
  readonly examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly point: Number;
}

export class UpdateExamHistoryDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()  
  readonly examId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly point?: Number;
}
