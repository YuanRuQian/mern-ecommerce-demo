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

export type SignInProps = {
    email: string;
    password: string;
};

export type RegisterProps = {
    username: string;
    email: string;
    password: string;
};
