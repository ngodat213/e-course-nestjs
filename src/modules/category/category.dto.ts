import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  readonly category: string;
}

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  readonly category?: string;
}