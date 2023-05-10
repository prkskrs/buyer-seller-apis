import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostView } from './post-view.entity';
import { PostReaction } from 'src/post-reaction/post-reaction.entity';

@Injectable()
export class PostViewService {
    constructor(
        @InjectRepository(PostView)
        private postViewRepository: Repository<PostView>,
    ) { }

    async logPostView(postId: number, viewerId: number): Promise<void> {
        const postView = this.postViewRepository.create({ postId, viewerId });
        await this.postViewRepository.save(postView);
    }

    async getViewsForPost(postId: number): Promise<number[]> {
        const postViews = await this.postViewRepository.find({
            where: { postId },
        });
        return postViews.map((view) => view.viewerId);
    }

    async getViewsForCatalogue(catalogueId: number): Promise<number[]> {
        const postViews = await this.postViewRepository
            .createQueryBuilder('postView')
            .leftJoin('postView.post', 'post')
            .where('post.catalogueId = :catalogueId', { catalogueId })
            .getMany();
        return postViews.map((view) => view.viewerId);
    }
}
