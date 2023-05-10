import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { CatalogueService } from 'src/catalogue/catalogue.service';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { BookmarkController } from './bookmark.controller';
import { Bookmark } from './bookmark.entity';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Catalogue, User])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
  exports: [BookmarkService],
})
export class BookmarkModule { }
