import { Vestido } from "./vestido.model";

export interface Category{
    id: number;
    name: string;
    descripcion: string;
    vestido?: Vestido;
    
}