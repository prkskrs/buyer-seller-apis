import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateInquiryDto } from './inquiry.dto';
import { Inquiry } from './inquiry.entity';
import { InquiryService } from './inquiry.service';

@ApiTags('inquiry')
@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post(':postId')
  createInquiry(
    @Param('postId') postId: number,
    @Body() createInquiryDto: CreateInquiryDto,
  ): Promise<Inquiry> {
    return this.inquiryService.createInquiry(postId, createInquiryDto);
  }

  @Get('seller/:sellerId')
  getInquiriesForSeller(@Param('sellerId') sellerId: number): Promise<Inquiry[]> {
    return this.inquiryService.getInquiriesForSeller(sellerId);
  }
}
