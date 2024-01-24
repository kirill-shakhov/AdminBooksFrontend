import { IUser } from "../IUser.ts";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface AuthErrorResponse {
    message: string,
    errors: [
        { field: string }
    ]
}