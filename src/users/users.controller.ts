import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, VerifyOtpDto } from './users.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

interface UserResponse {
    message: string;
    data?: any;
}

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private userServices: UsersService) { }

    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.userServices.register(body.mobileNumber, body.userType);
    }

    @Post('/verify-otp')
    async verifyOtp(@Body() body: VerifyOtpDto) {
        return this.userServices.verifyOtp(body.id, body.otp);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<UserResponse> {
        return this.userServices.update(id, body);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number): Promise<UserResponse> {
        return this.userServices.remove(id);
    }

    @Get('/list')
    async listUser(): Promise<UserResponse> {
        return this.userServices.listUser();
    }

    @Get('/follow')
    async followUser(@Query('followerId') followerId: number, @Query('followingId') followingId: number): Promise<UserResponse> {
        return this.userServices.followUser(followerId, followingId);
    }

    @Get('/unFollow')
    async unFollowUser(@Query('followerId') followerId: number, @Query('followingId') followingId: number): Promise<UserResponse> {
        return this.userServices.unFollowUser(followerId, followingId);
    }

    @Get('/followers/:userId')
    async getFollowers(@Param('userId') userId: number): Promise<UserResponse> {
        return this.userServices.getFollowers(userId);
    }

    @Get('/followings/:userId')
    async getFollowings(@Param('userId') userId: number): Promise<UserResponse> {
        return this.userServices.getFollowings(userId);
    }

    @Get('/')
    async getUserByMobileNumber(@Body() mobileNumber: string) {
        const user = await this.userServices.getUserByMobileNumber(mobileNumber);
        delete user.otp;
        return user;
    }

}
