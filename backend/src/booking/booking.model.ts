import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Booking{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    phone: number;

    @Column({type: 'date'})
    date: Date;

    @Column({type: 'time'})
    time: TimeRanges;

}

