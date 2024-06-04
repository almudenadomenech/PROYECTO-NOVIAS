import { User } from "src/users/users.model";
import { Vestidos } from "src/vestidos/vestidos.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Booking{

    @PrimaryGeneratedColumn()
    id: number;


    @Column({type: 'date'})
    dateTime: Date;

    @Column({nullable: false})
    comment?: string;

    @ManyToOne(() => Vestidos, {eager: true})
    vestidos: Vestidos;

    @ManyToOne(() => User, {eager: true})
    user: User;
}

