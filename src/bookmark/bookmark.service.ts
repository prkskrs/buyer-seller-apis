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

    async bookmarkCatalogue(bookmarkBody: CreateBookmarkDto): Promise<BookmarkResponse> {
        const { buyer, catalogue } = bookmarkBody;

        const buyerEntity = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id: buyer.id })
            .getOne();

        const catalogueEntity = await this.catalogueRepository
            .createQueryBuilder('catalogue')
            .where('catalogue.id = :id', { id: catalogue.id })
            .getOne();

        const bookmark = this.bookmarkRepository.create(
            {
                buyer: buyerEntity,
                catalogue: catalogueEntity,
            }
        );
        await this.bookmarkRepository.save(bookmark);
        return {
            message: "Bookmarked Successfully",
            data: {
                bookmark
            }
        }
    }


    async removeBookmark(id: number): Promise<BookmarkResponse> {
        const bookmark = await this.bookmarkRepository.createQueryBuilder('bookmark')
            .leftJoinAndSelect('bookmark.buyer', 'buyer')
            .leftJoinAndSelect('bookmark.catalogue', 'catalogue')
            .where('bookmark.id = :id', { id })
            .getOne();

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
