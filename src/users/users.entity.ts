import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    mobileNumber: string;

    @Column()
    otp: string;

    @Column()
    userType: string;

    @Column({ default: false })
    isVerified: boolean;

    @ManyToMany(() => User, { cascade: true, eager: true })
    @JoinTable()
    following: User[];

    @ManyToMany(() => User, (user) => user.following)
    followers: User[];


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}