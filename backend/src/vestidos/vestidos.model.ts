
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/category.model";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Vestidos{
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
    tipoCola: string;

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
    @ManyToOne(() => Category, {eager: true})
    @JoinTable()
    categories: Category[];

     /* @ManyToOne(() => Category, (category) => category.vestidos, { eager: true })
    category: Category;  */
}
