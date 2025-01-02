export interface User {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}