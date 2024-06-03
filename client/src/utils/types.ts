// Define the RoleTypes enum
export enum RoleTypes {
    USER = "user",
    ADMIN = "admin"
}

export type Role = {
    _id: string;
    name: RoleTypes;
};
// Define the User type
export type User = {
    _id: string;
    username: string;
    email: string;
    roles: Role[];
    accessToken: string;
    favorites: Product[];
};

export const isUserAdmin = (user: User | null) => {
    return user?.roles.some((role) => role.name === RoleTypes.ADMIN) || false;
};

export type Brand = {
    _id: string;
    name: string;
};

export type Type = {
    _id: string;
    name: string;
};

export type Product = {
    _id: string;
    name: string;
    images: string[];
    type: Type;
    brand: Brand;
};

export type ProductFilterProps = {
    page: number;
    type: string;
    brand: string;
};

export type SignInProps = {
    email: string;
    password: string;
};

export type RegisterProps = {
    username: string;
    email: string;
    password: string;
};
