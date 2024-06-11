import { Vestido } from "./vestido.model";

export interface Category{
    id: number;
    name: string;

    vestido?: Vestido;
    
}