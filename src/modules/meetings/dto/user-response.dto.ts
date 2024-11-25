import {User} from "../../users/entities/user.entity";

export class UserResponseDto {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.isAdmin = user.isAdmin
    }
}