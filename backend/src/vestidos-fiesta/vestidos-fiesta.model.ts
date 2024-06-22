import { ApiProperty } from "@nestjs/swagger";
import { CategoryFiesta } from "src/category-fiesta/category-fiesta.model";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class VestidoFiesta{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false})
    model: string;

    @ApiProperty()
    @Column({nullable: false})
    coleccion: string;

    @ApiProperty()
    @Column({nullable: false})
    description: string;

    @ApiProperty()
    @Column({nullable: false})
    price: number;

    @ApiProperty()
    @Column({nullable: false})
    photoUrl: string;

    @ApiProperty()
    @Column({nullable: false})
    corte: string; 

    @ApiProperty()
    @Column({nullable: false})
    escote: string;

    @ApiProperty()
    @Column({nullable: false})
    mangas: string;

    @ApiProperty()
    @Column({nullable: false})
    tejidos: string;

    @ApiProperty()
    @Column({nullable: false})
    espalda: string;

    @ApiProperty()
    @Column({nullable: false})
    talle: string;

    @ApiProperty()
    @Column({nullable: false})
    tallas: string;

    @ApiProperty({example: [{id: 1}]})
    @ManyToOne(() => CategoryFiesta, {eager: true})
    @JoinTable()
    categoriesFiesta: CategoryFiesta[];

     /* @ManyToOne(() => Category, (category) => category.vestidos, { eager: true })
    category: Category;  */
}