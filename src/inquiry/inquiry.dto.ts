import { IsString } from "class-validator";

export class CreateInquiryDto {
    @IsString()
    message: string;
}
