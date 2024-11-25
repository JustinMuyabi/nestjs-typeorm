import {IsNotEmpty, IsNumber} from "class-validator";

export class AddUserToMeetingDto {
    @IsNotEmpty()
    @IsNumber()
    readonly userId: string;
}