import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from "bcrypt";
import { OtpService } from './otp.service';
import { response } from 'express';

interface FollowResponse {
    message: string;
    data?: any;
}


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        public otpService: OtpService, // Inject the OtpService
    ) { }

    async register(mobileNumber: string, userType: string) {
        const existingUser = await this.userRepository.findOne({ where: { mobileNumber } })
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
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            return false;
        }
        if (user.otp === otp) {
            user.isVerified = true;
            delete user.otp;
            return this.userRepository.save(user)
        }
        else {
            var response = {
                message: "Otp Didn't Match"
            }
        }
        return response;
    }

    async update(id: number, attrs: Partial<Omit<User, 'otp'>>) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User Not Found');
        }
        Object.assign(user, attrs);
        delete user.otp;
        return this.userRepository.save(user);
    }


    async remove(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User Not Found');
        }
        return this.userRepository.remove(user);
    }

    async listUser() {
        const user = await this.userRepository.find({});
        const usersWithoutOtp = user.map((user) => {
            delete user.otp;
            return user;
        });

        return usersWithoutOtp;
    }


    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        delete user.otp;
        return user;
    }

    async getUserByMobileNumber(mobileNumber: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { mobileNumber } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        console.log(user);
        return user;
    }

    async followUser(followerId: number, followingId: number): Promise<FollowResponse> {
        const follower = await this.userRepository.findOne({
            where: { id: followerId },
            relations: ['following']
        });
        const following = await this.findOneById(followingId);

        if (!follower.following) {
            follower.following = [];
        }

        const isFollowing = follower.following.some((user) => user.id === following.id);

        if (isFollowing) {
            return {
                message: 'Already following user',
            };
        }

        follower.following.push(following);
        following.followers.push(follower)
        // console.log(follower.following);
        await this.userRepository.save(follower);
        await this.userRepository.save(following);
        return {
            message: 'User followed successfully',
            data: { follower, following },
        };
    }


    async unFollowUser(followerId: number, followingId: number): Promise<FollowResponse> {
        const follower = await this.userRepository.findOne({
            where: { id: followerId },
            relations: ['following']
        });
        var followingIndex: any;
        for (let i = 0; i < follower.following.length; i++) {
            if (follower.following[i]) {
                console.log(follower.following[i].id, followingId);
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

    async getFollowers(userId: number): Promise<User[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['followers']
        }); console.log(user);
        return user.followers;
    }

    async getFollowings(userId: number): Promise<User[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['following']
        });
        console.log(user.following);
        return user.following;
    }

}
