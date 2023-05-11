import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/posts.entity';
import { PostsModule } from 'src/posts/posts.module';
import { PostsService } from 'src/posts/posts.service';
import { InquiryController } from './inquiry.controller';
import { Inquiry } from './inquiry.entity';
import { InquiryService } from './inquiry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, Post]),PostsModule],
  controllers: [InquiryController],
  providers: [InquiryService,PostsService]
})
export class InquiryModule { }
