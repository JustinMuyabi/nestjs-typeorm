import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Meeting} from "../../meetings/entities/meeting.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 200, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @Column({type: 'boolean', nullable: true, default: true})
    isAdmin: boolean;

    @OneToMany((): typeof Meeting => Meeting, (meeting: Meeting): User => meeting.user)
    meetings: Meeting[];
}
