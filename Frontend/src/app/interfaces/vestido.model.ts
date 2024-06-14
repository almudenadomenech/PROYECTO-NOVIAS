import { Booking } from "./booking.model";
import { Category } from "./category.model";
import { User } from "./user.model";

export interface Vestido {

    id: number;
    model?: string;
    estilo?: string;
    coleccion?: string;
   
    price?: number;
    photoUrl: string;
    description: string;

    corte: string ;
    escote: string;
    tipoCola: string;
    tejidos: string;
    espalda: string;
    talle: string;
    tallas: string;
    categoryId: number;

    booking?: Booking;
    user?: User;
    categories: Category[];
    
}