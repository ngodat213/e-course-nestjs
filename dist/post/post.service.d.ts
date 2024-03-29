import { CreatePostDto } from './dto/create-post-dto/create-post-dto';
export declare class PostService {
    getListsPost(): Promise<string>;
    createPost(data: CreatePostDto): Promise<CreatePostDto>;
}
