import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './inquiry.entity';
import { Post } from 'src/posts/posts.entity';
import { CreateInquiryDto } from './inquiry.dto'

@Injectable()
export class InquiryService {
    constructor(
        @InjectRepository(Inquiry)
        private inquiryRepository: Repository<Inquiry>,

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
}
