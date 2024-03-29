import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post-dto/create-post-dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    getListsPost(): Promise<() => Promise<string>>;
    createPost(data: CreatePostDto): Promise<CreatePostDto>;
}
