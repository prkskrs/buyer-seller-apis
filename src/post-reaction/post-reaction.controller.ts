import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostReaction } from './post-reaction.entity';
import { PostReactionService } from './post-reaction.service';

@ApiTags('post-reaction')
@Controller('post-reaction')
export class PostReactionController {
    constructor(private readonly postReactionService: PostReactionService) { }

    @Post('like/:userId')
    async likePost(@Param('postId') postId: number, @Param('userId') userId: number): Promise<void> {
        return this.postReactionService.likePost(postId, userId);
    }

    @Post('dislike/:userId')
    async dislikePost(@Param('postId') postId: number, @Param('userId') userId: number): Promise<void> {
        return this.postReactionService.dislikePost(postId, userId);
    }

    @Delete(':userId')
    async removePostReaction(@Param('postId') postId: number, @Param('userId') userId: number): Promise<void> {
        return this.postReactionService.removePostReaction(postId, userId);
    }

    @Get()
    async getReactionsForPost(@Param('postId') postId: number): Promise<PostReaction[]> {
        return this.postReactionService.getReactionsForPost(postId);
    }
}
