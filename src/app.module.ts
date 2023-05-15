import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { Post } from './posts/posts.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { Catalogue } from './catalogue/catalogue.entity';
import { Bookmark } from './bookmark/bookmark.entity';
import { CatalogueAccessRequestModule } from './catalogue-access-request/catalogue-access-request.module';
import { PostViewModule } from './post-view/post-view.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { CatalogueAccessRequest } from './catalogue-access-request/catalogue-access-request.enitity';
import { PostView } from './post-view/post-view.entity';
import { Inquiry } from './inquiry/inquiry.entity';
import { PostReactionModule } from './post-reaction/post-reaction.module';
import { PostReaction } from './post-reaction/post-reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      // username: '<your username>',
      // password: '<your password>',
      database: 'prkskrs',
      entities: [User, Post, Catalogue, Bookmark, CatalogueAccessRequest, PostView, Inquiry, PostReaction],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    CatalogueModule,
    BookmarkModule,
    CatalogueAccessRequestModule,
    PostViewModule,
    InquiryModule,
    PostReactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
