import { Booking } from "./booking.model";
import { User } from "./user.model";

export interface Vestido {

    id: number;
   model: string;
   estilo: string;
    coleccion: string;
   
    price: number;
    photoUrl: string;
    descripcion: string;

    corte: string;
    escote: string;
    tipoCola: string;
    tejidos: string;
    espalda: string;
    talle: string;
    tallas: string;

    booking?: Booking;
    user?: User;
}