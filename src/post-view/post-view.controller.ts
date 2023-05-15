import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostViewService } from './post-view.service';

interface PostViewResponse {
    message: string;
    data?: any;
}

@ApiTags('post-view')
@Controller('post-view')
export class PostViewController {
    constructor(private postViewService: PostViewService) { }

    @Post(':postId/view/:viewerId')
    async logPostView(@Param('postId') postId: number, @Param('viewerId') viewerId: number): Promise<PostViewResponse> {
        return await this.postViewService.logPostView(postId, viewerId);
    }

    @Post(':postId/views')
    async getViewsForPost(@Param('postId') postId: number): Promise<PostViewResponse> {
        return this.postViewService.getViewsForPost(postId);

    }

    @Post(':catalogueId/views')
    async getViewsForCatalogue(@Param('catalogueId') catalogueId: number): Promise<PostViewResponse> {
        return this.postViewService.getViewsForCatalogue(catalogueId);
    }
}
