import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './inquiry.entity';
import { Post } from 'src/posts/posts.entity';
import { CreateInquiryDto } from './inquiry.dto'
import { PostsService } from 'src/posts/posts.service';

import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
@Injectable()
export class InquiryService {
    constructor(
        @InjectRepository(Inquiry)
        private inquiryRepository: Repository<Inquiry>,

        private postService: PostsService,

        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    async createInquiry(postId: number, inquiryData: CreateInquiryDto): Promise<Inquiry> {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        const inquiry = this.inquiryRepository.create({
            ...inquiryData,
            post,
        });

        return this.inquiryRepository.save(inquiry);
    }

    async getInquiriesForSeller(sellerId: number): Promise<Inquiry[]> {
        return this.inquiryRepository.createQueryBuilder('inquiry')
            .leftJoin('inquiry.post', 'post')
            .where('post.userId = :sellerId', { sellerId })
            .getMany();
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async sendInquiryNotificationsToSellers() {
        const inquiries = await this.inquiryRepository.find();
        for (const inquiry of inquiries) {
            const post = await this.postService.getPostById(inquiry.postId);
            if (post.data) {
                const sellerId = post.data.post.sellerId;
                // Send notification to seller using their ID
                console.log(`Notification sent to seller with ID: ${sellerId}`);
            }
        }
    }
}
