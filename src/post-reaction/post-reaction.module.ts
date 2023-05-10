import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostReactionController } from './post-reaction.controller';
import { PostReaction } from './post-reaction.entity';
import { PostReactionService } from './post-reaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostReaction])],
  controllers: [PostReactionController],
  providers: [PostReactionService]
})
export class PostReactionModule { }
