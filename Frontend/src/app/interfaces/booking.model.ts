import { Time } from "@angular/common";
import { Vestido } from "./vestido.model";
import { User } from "./user.model";

export interface Booking{

    id: number;
    
    date?: Date;
    time?: Time;
   
    comment?: string;

    vestidos?: Vestido;
    users?: User;
}