import { Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostReaction } from './post-reaction.entity';
import { PostReactionService } from './post-reaction.service';

interface PostReactionResponse {
    message: string;
    data?: any;
}

interface PostReactionCount {
    likeCount: number;
    dislikeCount: number;
}

@ApiTags('post-reaction')
@Controller('post-reaction')
export class PostReactionController {
    constructor(private readonly postReactionService: PostReactionService) { }

    @Post(':postId/like/:userId')
    async likePost(
        @Param('postId') postId: number,
        @Param('userId') userId: number,
    ): Promise<PostReactionResponse> {
        return this.postReactionService.likePost(postId, userId);
    }

    @Post(':postId/dislike/:userId')
    async dislikePost(
        @Param('postId') postId: number,
        @Param('userId') userId: number,
    ): Promise<PostReactionResponse> {
        return this.postReactionService.dislikePost(postId, userId);
    }

    @Delete(':postId/:userId')
    async removePostReaction(
        @Param('postId') postId: number,
        @Param('userId') userId: number,
    ): Promise<PostReactionResponse> {
        return this.postReactionService.removePostReaction(postId, userId);
    }

    @Get('/:postId')
    async getReactionsForPost(
        @Param('postId') postId: number,
    ): Promise<PostReactionResponse> {
        return this.postReactionService.getReactionsForPost(postId);
    }

    @Get(':postId/count')
    async getReactionCountForPost(
        @Param('postId') postId: number,
    ): Promise<PostReactionCount> {
        return this.postReactionService.getReactionCountForPost(postId);
    }
}
