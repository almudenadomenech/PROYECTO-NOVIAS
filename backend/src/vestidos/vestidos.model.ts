
import { Category } from "src/category/category.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Vestidos{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    model: string;

    @Column({nullable: false})
    estilo: string;

    @Column({nullable: false})
    coleccion: string;

    @Column({nullable: false})
    descripcion: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false})
    photoUrl: string;

    @Column({nullable: false})
    corte: string;

    @Column({nullable: false})
    escote: string;

    @Column({nullable: false})
    tipoCola: string;

    @Column({nullable: false})
    tejidos: string;

    @Column({nullable: false})
    espalda: string;

    @Column({nullable: false})
    talle: string;

    @Column({nullable: false})
    tallas: string;

    @ManyToOne(() => Category, category => category.vestidos)
    category: Category;

}
