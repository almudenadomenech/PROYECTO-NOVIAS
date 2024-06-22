import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryFiesta{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    descripcion: string;

}