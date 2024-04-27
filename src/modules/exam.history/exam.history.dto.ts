import { IsNumber, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateExamHistoryDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly userId: string;

  @IsNotEmpty()
  @IsMongoId()  
  readonly examId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly point: Number;
}

export class UpdateExamHistoryDTO {
  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @IsOptional()
  @IsMongoId()  
  readonly examId?: string;

  @IsOptional()
  @IsNumber()
  readonly point?: Number;
}
