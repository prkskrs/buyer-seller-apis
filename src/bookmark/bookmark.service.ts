import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { User } from 'src/users/users.entity';
import { Bookmark } from './bookmark.entity';
import { CreateBookmarkDto } from './bookmark.dto';

interface BookmarkResponse {
    message: string;
    data?: any;
}


@Injectable()
export class BookmarkService {
    constructor(
        @InjectRepository(Bookmark)
        private bookmarkRepository: Repository<Bookmark>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Catalogue)
        private catalogueRepository: Repository<Catalogue>,
    ) { }

    async bookmarkCatalogue(bookmarkBody: CreateBookmarkDto): Promise<Bookmark> {
        const buyer = await this.userRepository.findOne({ where: { id: bookmarkBody.buyer.id } });
        // console.log(buyer);

        const catalogue = await this.catalogueRepository.findOne({ where: { id: bookmarkBody.catalogue.id } });
        // console.log(catalogue);

        const bookmark = new Bookmark();
        bookmark.buyer = buyer;
        bookmark.catalogue = catalogue;
        // await this.bookmarkRepository.save(bookmark);
        return this.bookmarkRepository.save(bookmark);
    }

    async removeBookmark(id: number): Promise<BookmarkResponse> {
        const bookmark = await this.bookmarkRepository.findOne({ where: { id } });
        if (!bookmark) {
            throw new NotFoundException(`Bookmark not found with id: ${id}`);
        }
        await this.bookmarkRepository.remove(bookmark);
        return {
            message: "Bookmark Deleted",
            data: {
                deletedBookmark: bookmark,
            },
        };
    }


    async getBookmarkedCatalogues(buyerId: number): Promise<Catalogue[]> {
        const bookmarks = await this.bookmarkRepository.find({ where: { buyer: { id: buyerId } }, relations: ['catalogue'] });

        return bookmarks.map((bookmark) => bookmark.catalogue);
    }
}
