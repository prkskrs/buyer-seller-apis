import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Catalogue } from 'src/catalogue/catalogue.entity';

@Entity()
export class CatalogueAccessRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    buyer: User;

    @ManyToOne(() => Catalogue)
    catalogue: Catalogue;

    @Column({ default: 'false' })
    approved: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
