import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity('meetings')
export class Meeting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @ManyToOne(() : typeof User => User, user => user.meetings)
    @JoinColumn({name: 'user_id'})
    user: User;
}
