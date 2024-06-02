// Define the RoleTypes enum
export enum RoleTypes {
    USER = "user",
    ADMIN = "admin"
}

// Define the User type
export type User = {
    id: string;
    username: string;
    email: string;
    roles: RoleTypes[];
    accessToken: string;
};

export type Product = {
    _id: string;
    name: string;
    images: string[];
    type: {
        _id: string;
        name: string;
    };
    brand: {
        _id: string;
        name: string;
    };
};

export type ProductFilterProps = {
    page?: number;
    type?: string;
    brand?: string;
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
