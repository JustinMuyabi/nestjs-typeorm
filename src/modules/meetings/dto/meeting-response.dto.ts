import {User} from "../../users/entities/user.entity";
import {Meeting} from "../entities/meeting.entity";
import {UserResponseDto} from "./user-response.dto";

export class MeetingResponseDto {
    id: number;
    title: string;
    description: string;
    users: UserResponseDto[];

    constructor(meeting: Meeting) {
        this.id = meeting.id;
        this.title = meeting.title;
        this.description = meeting.description;
        this.users = meeting.users.map((user: User) => new UserResponseDto(user));
    }
}