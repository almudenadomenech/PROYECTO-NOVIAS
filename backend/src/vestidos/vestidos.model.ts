import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Vestidos{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    model: string;

    @Column({nullable: false})
    size: number;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    photoUrl: string;
}