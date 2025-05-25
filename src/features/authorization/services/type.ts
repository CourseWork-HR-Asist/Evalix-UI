export interface GoogleAuthResponse {
    token: string;
}

export interface Role {
    id: string;
    title: string;
}

export interface User {
    id: string;
    firstName: string;
    username: string;
    email: string;
    updatedAt: string;
    roleId: string;
    role: Role;
}

export interface UserWithToken extends User {
    token: string;
}
