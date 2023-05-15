import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostReaction } from './post-reaction.entity';

interface PostReactionResponse {
  message: string;
  data?: any;
}

interface PostReactionCount {
  likeCount: number;
  dislikeCount: number;
}


@Injectable()
export class PostReactionService {
  constructor(
    @InjectRepository(PostReaction)
    private postReactionRepository: Repository<PostReaction>,
  ) { }

  async likePost(postId: number, userId: number): Promise<PostReactionResponse> {
    const postReaction = await this.postReactionRepository.findOne({
      where: { postId, userId },
    });

    if (postReaction) {
      return {
        message: `You have alreeady like this post`,
      }
    } else {
      await this.postReactionRepository.insert({
        postId,
        userId,
        likeCount: 1,
      });
    }
    return {
      message: `Post with post id : ${postId} liked successfully`,
    }
  }

  async dislikePost(postId: number, userId: number): Promise<PostReactionResponse> {
    const postReaction = await this.postReactionRepository.findOne({
      where: { postId, userId },
    });

    if (postReaction) {
      postReaction.dislikeCount++;
      await this.postReactionRepository.save(postReaction);
    } else {
      await this.postReactionRepository.insert({
        postId,
        userId,
        dislikeCount: 1,
      });
    }
    return {
      message: `Post with  post id : ${postId} disliked successfully`,
    }
  }

  async removePostReaction(postId: number, userId: number): Promise<PostReactionResponse> {
    const postReaction = await this.postReactionRepository.findOne({
      where: { postId, userId },
    });

    if (!postReaction) {
      throw new NotFoundException(
        `Post reaction not found for postId: ${postId} and userId: ${userId}`,
      );
    }

    await this.postReactionRepository.remove(postReaction);

    return {
      message: `Post with postId : ${postId} removed successfully`,
    }
  }

  async getReactionsForPost(postId: number): Promise<PostReactionResponse> {
    const postReactions = await this.postReactionRepository.find({ where: { postId } });
    return {
      message: `All reactions for post id : ${postId}`,
      data: {
        postReactions
      }
    }
  }

  async getReactionCountForPost(postId: number): Promise<PostReactionCount> {
    const result = await this.postReactionRepository.createQueryBuilder('postReaction')
      .select('SUM(CASE WHEN postReaction.likeCount > 0 THEN 1 ELSE 0 END)', 'likeCount')
      .addSelect('SUM(CASE WHEN postReaction.dislikeCount > 0 THEN 1 ELSE 0 END)', 'dislikeCount')
      .where('postReaction.postId = :postId', { postId })
      .getRawOne();

    const { likeCount, dislikeCount } = result;

    return { likeCount, dislikeCount };
  }


}
