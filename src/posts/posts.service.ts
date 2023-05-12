import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './posts.dto';
import { Post } from './posts.entity';

interface PostResponse {
    message: string;
    data?: any;
}

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        // @InjectRepository(User) private usersRepository: Repository<User>,
        // private usersServices: UsersService
    ) { }

    async createPost(postData: CreatePostDto, files: any[]) {
        // const user = this.usersServices.findOneById(postData.sellerId);
        console.log(files);
        const post = this.postsRepository.create({
            ...postData,
            imageUrls: files.map(file => file.originalname)
        });
        await this.postsRepository.save(post);
        return {
            message: "Post Created Successfully",
            data: {
                post
            }
        }

    }

    async updatePost(id: number, attrs: Partial<Post>): Promise<PostResponse> {
        const post = await this.postsRepository.findOne({ where: { id } });
        if (!post) {
            throw new Error('Post Not Found');
        }
        Object.assign(post, attrs);
        await this.postsRepository.save(post);
        return {
            message: "Updated Post",
            data: post
        }
    }

    async deletePost(id: number) {
        const post = await this.postsRepository.findOne({ where: { id } });
        if (!post) {
            throw new Error('Post Not Found');
        }
        return this.postsRepository.remove(post);
    }


    async getPostById(id: number): Promise<PostResponse> {
        const post = await this.postsRepository.findOne({
            where: { id }
        });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return {
            message: `Found post with this  id : ${id}`,
            data: {
                post
            }
        };
    }

    async getPostsBySellerId(sellerId: number): Promise<PostResponse> {
        console.log(sellerId);

        const post = await this.postsRepository.findOne({
            where: { sellerId }
        });
        console.log(post);

        if (!post) {
            throw new NotFoundException(`Post not found with this seller id: ${sellerId}`);
        }
        return {
            message: `Found post with this seller id : ${sellerId}`,
            data: {
                post
            }
        };
    }

    async getSponsoredPosts(): Promise<PostResponse> {
        const post = await this.postsRepository.find({
            where: {
                isSponsored: true
            }
        });
        return {
            message: `Sponsered Posts`,
            data: {
                post
            }
        };
    }

    async getRegularPosts(): Promise<PostResponse> {
        const post = await this.postsRepository.find({
            where: {
                isSponsored: false
            }
        });
        return {
            message: `Regular Posts`,
            data: {
                post
            }
        };
    }

    async listPost(): Promise<PostResponse> {
        const post = await this.postsRepository.find({});
        return {
            message: "All Posts",
            data: {
                post
            }
        };
    }

    async getRegularPostsAndOneSponsered(): Promise<PostResponse> {
        const posts = await this.postsRepository.find({
            where: {
                isSponsored: false
            }
        });
        const sponsoredPosts = await this.postsRepository.find({
            where: {
                isSponsored: true
            }
        });
        const regularPostCount = posts.length;
        const sponsoredPostCount = sponsoredPosts.length;
        const result: Post[] = [];
        for (let i = 0; i < regularPostCount; i++) {
            result.push(posts[i]);
            if ((i + 1) % 5 === 0 && sponsoredPostCount > 0) {
                result.push(sponsoredPosts[(i + 1) / 5 - 1]);
            }
        }
        return {
            message: `Regular Posts with Sponsored Posts`,
            data: {
                posts: result
            }
        };
    }

}
