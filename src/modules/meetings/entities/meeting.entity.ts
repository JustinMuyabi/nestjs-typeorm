import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity('meetings')
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @ManyToMany((): typeof User => User, (user: User): Meeting[] => user.meetings)
    @JoinTable({name: 'user_meetings'})
    users: User[];
}
