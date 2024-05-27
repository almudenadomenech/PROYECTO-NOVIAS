import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.model";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true})
    street: string;

    @Column({nullable: true})
    postalCode: number;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    phone: number;

    @Column({nullable: true})
    photoUrl: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;
}