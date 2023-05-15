import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostView } from './post-view.entity';
import { PostReaction } from 'src/post-reaction/post-reaction.entity';

interface PostViewResponse {
    message: string;
    data?: any;
}

@Injectable()
export class PostViewService {
    constructor(
        @InjectRepository(PostView)
        private postViewRepository: Repository<PostView>,
    ) { }

    async logPostView(postId: number, viewerId: number): Promise<PostViewResponse> {
        const queryBuilder = this.postViewRepository.createQueryBuilder();
        const postView = await queryBuilder.insert()
            .into(PostView)
            .values({ postId, viewerId })
            .execute();
        return {
            message: `View Log For post:${postId}`,
            data: { postView }
        }

    }

    async getViewsForPost(postId: number): Promise<PostViewResponse> {

        const queryBuilder = this.postViewRepository.createQueryBuilder('postView');

        const postViews = await queryBuilder
            .select('postView.viewerId', 'viewerId')
            .where('postView.postId = :postId', { postId })
            .getRawMany();

        const views = postViews.map((view) => view.viewerId);

        return {
            message: `Views for post: ${postId}`,
            data: { views },
        };
    }


    async getViewsForCatalogue(catalogueId: number): Promise<PostViewResponse> {
        const queryBuilder = this.postViewRepository.createQueryBuilder('postView');
        const postViews = await queryBuilder
            .select('DISTINCT viewerId')
            .leftJoin('postView.post', 'post')
            .where('post.catalogueId = :catalogueId', { catalogueId })
            .getRawMany();
        const views = postViews.map((view) => view.viewerId);
        return {
            message: `Views for catalogue : ${catalogueId}`,
            data: { views },
        }
    }
}
