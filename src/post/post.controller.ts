import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto/create-post-dto';

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){

    }
    
    @Get('')
    async getListsPost(){
        return await this.postService.getListsPost;
    }

    @Post('create')
    async createPost(@Body() data: CreatePostDto){
        return await this.postService.createPost(data);
    }
}
