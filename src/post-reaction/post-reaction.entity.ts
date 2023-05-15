import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostReaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postId: number;

    @Column()
    userId: number;

    @Column({ default: 0 })
    likeCount: number;

    @Column({ default: 0 })
    dislikeCount: number;
}
