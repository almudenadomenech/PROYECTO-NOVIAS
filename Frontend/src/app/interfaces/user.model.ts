export interface User{
    id: number;
    firstName?: string;
    lastName?: string;
    street?: string;
    postalCode?: string;
    nif?: string;
    city?: string;
    email?: string;
    phone?: string;
    photoUrl?: string;
    password?: string;

    role?: Role;

}
export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}