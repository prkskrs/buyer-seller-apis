// npm i class-validator class-transformer
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    mobileNumber: string;

    @ApiProperty()
    @IsString()
    userType: string;
}

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString() 
    mobileNumber: string;

    @ApiProperty()
    @IsString()
    userType: string;
}


export class VerifyOtpDto{
    @ApiProperty()
    @IsString()
    id:number;

    @ApiProperty()
    @IsString()
    otp:string;
}