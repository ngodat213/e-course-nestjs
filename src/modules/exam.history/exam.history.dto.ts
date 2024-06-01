import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsMongoId, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateExamHistoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly lesson: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly examSubmit: ExamSubmit[];

  point?: number = 0;
  correct?: string[] = [];
  questions?: string[] = [];
}

export class ExamSubmit{
  @ApiProperty()
  @IsNotEmpty()
  readonly id: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly answer: Number;
}

export class UpdateExamHistoryDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()  
  readonly lesson?: string;

  point: number = 0;
  correct: number = 0;
  incorrect: number = 0;
}
