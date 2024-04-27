import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
}

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  readonly title?: string;
}