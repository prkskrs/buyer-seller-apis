import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateBookmarkDto } from './bookmark.dto';
import { Bookmark } from './bookmark.entity';
import { BookmarkService } from './bookmark.service';
import { ApiTags } from '@nestjs/swagger';

interface BookmarkResponse {
    message: string;
    data?: any;
}

@ApiTags('bookmark')
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkServices: BookmarkService) { }

    @Post('/bookmark-catalogue')
    async bookmarkCatalogue(@Body() body: CreateBookmarkDto): Promise<BookmarkResponse> {
        return this.bookmarkServices.bookmarkCatalogue(body);
    }

    @Delete('/delete/:id')
    async removeBookmark(@Param('id') id: number): Promise<BookmarkResponse> {
        return this.bookmarkServices.removeBookmark(id);
    }

    @Get('/buyer/:buyerId')
    getBookmarkedCatalogues(@Param('buyerId') buyerId: number) {
        return this.bookmarkServices.getBookmarkedCatalogues(buyerId);
    }

}
