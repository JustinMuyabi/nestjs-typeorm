import {IsNotEmpty, IsString} from "class-validator";

export class CreateMeetingDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
