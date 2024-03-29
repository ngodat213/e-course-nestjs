import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
    @ApiProperty()
    context: String;
    
    @ApiProperty()
    title: String;
}
