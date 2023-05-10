import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/posts.entity';
import { InquiryController } from './inquiry.controller';
import { Inquiry } from './inquiry.entity';
import { InquiryService } from './inquiry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Inquiry, Post])],
  controllers: [InquiryController],
  providers: [InquiryService]
})
export class InquiryModule { }
