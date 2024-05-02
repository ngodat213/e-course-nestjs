import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly category: string;
}

export class UpdateCategoryDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly category?: string;
}