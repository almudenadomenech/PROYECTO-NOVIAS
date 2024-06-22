import { VestidoFiesta } from "./vestido-fiesta.model";

export interface CategoryFiesta{
    id: number;
    name: string;
    descripcion: string;
    vestidoFiesta?: VestidoFiesta
}