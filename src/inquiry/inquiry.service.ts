import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './inquiry.entity';
import { Post } from 'src/posts/posts.entity';
import { CreateInquiryDto } from './inquiry.dto'
import { PostsService } from 'src/posts/posts.service';

import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';

interface InquiryResponse {
    message: string;
    data?: any;
}

@Injectable()
export class InquiryService {
    constructor(
        @InjectRepository(Inquiry)
        private inquiryRepository: Repository<Inquiry>,

        private postService: PostsService,

        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    async createInquiry(postId: number, inquiryData: CreateInquiryDto): Promise<InquiryResponse> {
        const post = await this.postRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        const inquiry = this.inquiryRepository.create({
            ...inquiryData,
            post,
        });

        await this.inquiryRepository.save(inquiry);

        return {
            message: ` inquiry done on post id : ${postId}`,
            data: {
                inquiryDetails: inquiry
            }
        }
    }

    async getInquiriesForSeller(sellerId: number): Promise<InquiryResponse> {
        const inquiries = await this.inquiryRepository.createQueryBuilder('inquiry')
            .leftJoin('inquiry.post', 'post')
            .where('post.sellerId = :sellerId', { sellerId })
            .getMany();

        return {
            message: `All Inquiries of seller with id : ${sellerId}`,
            data: {
                inquiries
            }
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async sendInquiryNotificationsToSellers() {
        const inquiries = await this.inquiryRepository.createQueryBuilder('inquiry')
            .leftJoin('inquiry.post', 'post')
            .select('DISTINCT post.sellerId', 'sellerId')
            .getRawMany();

        for (const inquiry of inquiries) {
            const sellerId = inquiry.sellerId;
            // Send notification to seller using their ID
            console.log(`Notification sent to seller with ID: ${sellerId}`);
        }
    }

}
