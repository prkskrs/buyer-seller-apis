import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostViewService } from './post-view.service';

@ApiTags('post-view')
@Controller('post-view')
export class PostViewController {
    constructor(private postViewService: PostViewService) { }

    @Post(':postId/view/:viewerId')
    async logPostView(@Param('postId') postId: number, @Param('viewerId') viewerId: number): Promise<void> {
        await this.postViewService.logPostView(postId, viewerId);
    }

    @Post(':postId/views')
    async getViewsForPost(@Param('postId') postId: number): Promise<number[]> {
        return this.postViewService.getViewsForPost(postId);
    }

    @Post(':catalogueId/views')
    async getViewsForCatalogue(@Param('catalogueId') catalogueId: number): Promise<number[]> {
        return this.postViewService.getViewsForCatalogue(catalogueId);
    }
}
