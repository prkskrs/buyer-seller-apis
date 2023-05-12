import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from "bcrypt";
import { OtpService } from './otp.service';
import { response } from 'express';

interface UserResponse {
    message: string;
    data?: any;
}


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        public otpService: OtpService,
    ) { }

    async register(mobileNumber: string, userType: string) {

        // const existingUser = await this.userRepository.findOne({ where: { mobileNumber : "123456"} })
        const existingUser = await this.userRepository
            .createQueryBuilder('user')
            .where('user.mobileNumber = :mobileNumber', { mobileNumber })
            .getOne();

        if (existingUser) {
            throw new BadRequestException(`User with this ${mobileNumber} mobile number already exists.`)
        }

        const otp = this.otpService.generateOTP();

        const user = this.userRepository.create({
            mobileNumber: mobileNumber,
            userType: userType,
            otp: otp
        });

        return this.userRepository.save(user);
    }

    async verifyOtp(id: number, otp: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.otp = :otp', { otp })
            .getOne();

        if (!user) {
            return false;
        }

        var response = {}

        if (user.otp === otp) {
            user.isVerified = true;
            delete user.otp;
            response = {
                message: "User Verified Successfully!",
                data: { user }
            }
        }
        else {
            response = {
                message: "Otp Didn't Match"
            }
        }
        return response;
    }

    async update(id: number, attrs: Partial<User>): Promise<UserResponse> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new Error('User Not Found');
        }

        Object.assign(user, attrs);
        delete user.otp;
        await this.userRepository.save(user);
        return {
            message: "Updated User Successfully!",
            data: {
                user
            }
        }
    }


    async remove(id: number): Promise<UserResponse> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new Error('User Not Found');
        }
        await this.userRepository.remove(user);
        return {
            message: "Deleted User",
            data: {
                deletedUser: user
            }
        }
    }

    async listUser(): Promise<UserResponse> {
        const user = await this.userRepository.createQueryBuilder('user').getMany()
        const users = user.map((user) => {
            delete user.otp;
            return user;
        });

        return {
            message: "Users Listing",
            data: {
                users
            }
        }
    }


    async findOneById(id: number) {
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();

        if (!user) {
            throw new NotFoundException('User not found');
        }
        delete user.otp;
        return user;
    }

    async getUserByMobileNumber(mobileNumber: string): Promise<User> {
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.mobileNumber = :mobileNumber', { mobileNumber })
            .getOne();

        if (!user) {
            throw new NotFoundException('User not found');
        }
        console.log(user);
        return user;
    }

    async followUser(followerId: number, followingId: number): Promise<UserResponse> {
        const follower = await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.following", "following")
            .where("user.id = :id", { id: followerId })
            .getOne();

        const following = await this.findOneById(followingId);

        if (!follower.following) {
            follower.following = [];
        }

        const isFollowing = follower.following.some((user) => user.id === following.id);

        if (isFollowing) {
            return {
                message: "Already following user",
            };
        }

        follower.following.push(following);
        // following.followers.push(follower)

        await this.userRepository.save(follower);
        // await this.userRepository.save(following);

        return {
            message: "User followed successfully",
            data: { follower, following },
        };
    }



    async unFollowUser(followerId: number, followingId: number): Promise<UserResponse> {
        const follower = await this.userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.following", "following")
            .where("user.id = :id", { id: followerId })
            .getOne();

        var followingIndex: any;
        for (let i = 0; i < follower.following.length; i++) {
            if (follower.following[i]) {
                if (follower.following[i].id == followingId) {
                    followingIndex = i;
                    break;
                }
                else {
                    followingIndex = -1
                }
            }

        }
        if (followingIndex === -1) {
            return {
                message: 'Not following user',
            };

        }
        follower.following.splice(followingIndex, 1);
        await this.userRepository.save(follower);
        return {
            message: 'User unfollowed successfully',
            data: { follower }
        };

    }

    async getFollowers(userId: number): Promise<UserResponse> {
        const queryBuilder = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.followers', 'follower')
            .where('user.id = :userId', { userId })
            .getOne();
        const user = await queryBuilder;
        return {
            message: `Followers of id : ${userId}`,
            data: {
                follower: user["follower"]
            }
        }
    }

    async getFollowings(userId: number): Promise<UserResponse> {
        const queryBuilder = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.following', 'following')
            .where('user.id = :userId', { userId })
            .getOne();
        const user = await queryBuilder;
        return {
            message: `Followings of id : ${userId}`,
            data: {
                followings: user["following"]
            }
        }
    }


}
