export interface User{
    id: number;
    name: string;
    lastName: string;
    street: string;
    postalCode: number;
    city: string;
    email: string;
    phone: number;
    photoUrl: string;

    role: Role;

}
export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}