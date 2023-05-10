import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    sellerId: number;

    @Column({ type: 'varchar', array: true, default: [] })
    imageUrls: string[];

    @Column()
    postCategory: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column()
    currency: string;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'boolean' })
    taxIncluded: boolean;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean' })
    isSponsored: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
