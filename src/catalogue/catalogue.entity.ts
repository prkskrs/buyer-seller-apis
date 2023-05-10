import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class Catalogue {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    sellerId: number;

    @Column()
    name: string;

    @Column()
    pdfUrl: string;

    @Column()
    isPrivate: boolean;

    @Column()
    previewImageUrl: string;

    @Column()
    catalogueCategory: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
