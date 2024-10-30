import { TimeLike } from "fs";
import { Category } from "src/category/category.model";
import { User } from "src/users/users.model";
import { VestidosFiestaController } from "src/vestidos-fiesta/vestidos-fiesta.controller";
import { VestidoFiesta } from "src/vestidos-fiesta/vestidos-fiesta.model";
import { Vestidos } from "src/vestidos/vestidos.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Booking{

    @PrimaryGeneratedColumn()
    id: number;


    @Column({type: 'date'})
    date: Date;

    @Column({type: 'time'})
    time: TimeLike;

    @Column({nullable: false})
    comment?: string;

    @Column({nullable: true})
    photoUrl?: string;


    @ManyToOne(() => Vestidos, {eager: true})
    vestidos: Vestidos;
    
    @ManyToOne(() => VestidoFiesta, {eager: true})
    vestidoFiesta: VestidoFiesta;

    @ManyToOne(() => User, {eager: true})
    user: User;

   
}

