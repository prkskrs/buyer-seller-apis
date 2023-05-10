import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostReaction } from 'src/post-reaction/post-reaction.entity';
import { PostViewController } from './post-view.controller';
import { PostView } from './post-view.entity';
import { PostViewService } from './post-view.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostView, PostReaction])],
  controllers: [PostViewController],
  providers: [PostViewService]
})
export class PostViewModule { }
