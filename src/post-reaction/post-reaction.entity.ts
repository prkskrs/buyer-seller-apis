import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Post } from 'src/posts/posts.entity';

@Entity()
export class PostReaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: 'like' | 'dislike';

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Post)
    post: Post;
}
