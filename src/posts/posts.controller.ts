import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PostsService } from './posts.service';

interface PostResponse {
    message: string;
    data?: any;
}

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(private postsServices: PostsService) { }

    @Post('/create')
    async createPost(@Body() body: CreatePostDto) {
        return this.postsServices.createPost(body);
    }

    @Patch('/update/:id')
    updatePost(@Param('id') id: number, @Body() body: UpdatePostDto): Promise<PostResponse> {
        return this.postsServices.updatePost(id, body);
    }

    @Delete('/delete/:id')
    deletePost(@Param('id') id: number) {
        return this.postsServices.deletePost(id);
    }

    @Get('/regular')
    getRegularPosts(): Promise<PostResponse> {
        return this.postsServices.getRegularPosts();
    }

    @Get('/sponsored')
    getSponsoredPosts(): Promise<PostResponse> {
        return this.postsServices.getSponsoredPosts();
    }

    @Get('regular-sponsered')
    async getRegularPostsAndOneSponsered() : Promise<PostResponse> {
        return await this.postsServices.getRegularPostsAndOneSponsered();
    }

    @Get('/')
    listPost(): Promise<PostResponse> {
        return this.postsServices.listPost();
    }

    @Get('/:id')
    getPostById(@Param('id') id: number): Promise<PostResponse> {
        return this.postsServices.getPostById(id);
    }

    @Get('/seller/:sellerId')
    getPostsBySellerId(@Param('sellerId') sellerId: number): Promise<PostResponse> {
        return this.postsServices.getPostsBySellerId(sellerId);
    }
}
