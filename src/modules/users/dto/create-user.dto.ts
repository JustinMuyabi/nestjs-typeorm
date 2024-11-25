import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    isAdmin: boolean;
}
