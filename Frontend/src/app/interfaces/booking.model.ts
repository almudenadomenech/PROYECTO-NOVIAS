import { Time } from "@angular/common";
import { Vestido } from "./vestido.model";
import { User } from "./user.model";

export interface Booking{

    id: number;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: number;
    dateTime?: Date;
   
    comment?: string;

    vestidos?: Vestido;
    users?: User;
}