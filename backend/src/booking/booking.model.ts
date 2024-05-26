import { Vestidos } from "src/vestidos/vestidos.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    dateTime: Date;

    @Column({nullable: true})
    comment: string;

    @ManyToOne(() => Vestidos, {eager: true})
    vestido: Vestidos;
}

