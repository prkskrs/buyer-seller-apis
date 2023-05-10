import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostReaction } from './post-reaction.entity';

@Injectable()
export class PostReactionService {
  constructor(
    @InjectRepository(PostReaction)
    private postReactionRepository: Repository<PostReaction>,
  ) {}

  async likePost(postId: number, userId: number): Promise<void> {
    const postReaction = this.postReactionRepository.create({
      post: { id: postId },
      user: { id: userId },
      type: 'like',
    });
    await this.postReactionRepository.save(postReaction);
  }

  async dislikePost(postId: number, userId: number): Promise<void> {
    const postReaction = this.postReactionRepository.create({
      post: { id: postId },
      user: { id: userId },
      type: 'dislike',
    });
    await this.postReactionRepository.save(postReaction);
  }

  async removePostReaction(postId: number, userId: number): Promise<void> {
    await this.postReactionRepository.delete({ post: { id: postId }, user: { id: userId } });
  }

  async getReactionsForPost(postId: number): Promise<PostReaction[]> {
    return this.postReactionRepository.find({
      where: { post: { id: postId } },
    });
  }
}
