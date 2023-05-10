// npm i class-validator class-transformer
import { IsArray, IsBoolean, IsDecimal, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { User } from 'src/users/users.entity';
export class CreateBookmarkDto {

    @IsNumber()
    id: number;

    buyer: User;

    catalogue: Catalogue;
}

export class UpdateBookmarkDto {
    @IsNumber()
    id: number;

    buyer: User;

    catalogue: Catalogue;
}
