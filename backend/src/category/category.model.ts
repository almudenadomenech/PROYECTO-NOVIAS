import { Vestidos } from "src/vestidos/vestidos.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Vestidos, vestidos => vestidos.category )
    vestidos: Vestidos[]
}