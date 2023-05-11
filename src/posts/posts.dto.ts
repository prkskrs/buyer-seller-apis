// npm i class-validator class-transformer
import { IsArray, IsBoolean, IsDecimal, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/users.entity';
export class CreatePostDto {

    @IsOptional()
    sellerId: number;

    @IsArray()
    imageUrls: string[];

    @IsString()
    postCategory: string;

    quantity: number;

    @IsString()
    currency: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    taxIncluded: boolean;

    @IsString()
    description: string;

    @IsBoolean()
    isSponsored: boolean;
}

export class UpdatePostDto {

    @IsOptional()
    sellerId: number;

    @IsArray()
    imageUrls: string[];

    @IsString()
    postCategory: string;

    quantity: number;

    @IsString()
    currency: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    taxIncluded: boolean;

    @IsString()
    description: string;

    @IsBoolean()
    isSponsored: boolean;
}