import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, NotContains } from "class-validator";

export class CreateCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @NotContains(" ")
  readonly category: string;
}

export class UpdateCategoryDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @NotContains(" ")
  readonly category?: string;
}