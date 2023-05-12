// npm i class-validator class-transformer
import { IsArray, IsBoolean, IsDecimal, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/users.entity';
export class CreateCatalogueDto {

    @IsNumber()
    sellerId: number;

    @IsString()
    name: string;

    @IsString()
    pdfUrl: string;

    @IsBoolean()
    isPrivate: boolean;

    @IsString()
    previewImageUrl: string;

    @IsString()
    catalogueCategory: string;
}

export class UpdateCatalogueDto {
    @IsNumber()
    sellerId: number;

    @IsString()
    name: string;

    @IsString()
    pdfUrls: string[];

    @IsBoolean()
    isPrivate: boolean;

    @IsString()
    previewImageUrl: string;

    @IsString()
    catalogueCategory: string;
}
