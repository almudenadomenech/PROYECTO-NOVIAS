import { Vestidos } from "src/vestidos/vestidos.model";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    descripcion: string;

    /* @ManyToOne(() => Vestidos, {eager: true})
    vestidos: Vestidos; */

    /*  @OneToMany(() => Vestidos, (vestidos) => vestidos.category)
  vestidos: Vestidos[];  */
}