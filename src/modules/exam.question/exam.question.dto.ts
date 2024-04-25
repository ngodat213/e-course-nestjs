import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";

export class CreateExamQuestionDTO {
  @IsNotEmpty()
  @IsString()
  readonly question: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly options: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly answer: number;

  @IsUrl()
  readonly imageUrl: string;

  @IsNotEmpty()
  @IsObject()
  readonly exam?: { id: string };
}

export class UpdateExamQuestionDTO {
  @IsOptional()
  @IsString()
  readonly question?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly options?: string[];

  @IsOptional()
  @IsNumber()
  readonly answer?: number;

  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;

  @IsOptional()
  @ValidateNested()
  readonly lesson?:  { id: string };
}