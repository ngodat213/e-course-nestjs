import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto/create-post-dto';

@Injectable()
export class PostService {
    async getListsPost(){
        return "Post Service";
    }

    async createPost(data: CreatePostDto){
        console.log("-------------Service: create Post")
        return data;
    }
}
