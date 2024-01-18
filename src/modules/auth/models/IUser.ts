import { array } from "yup";

export interface IUser {
    email: string;
    id: string;
    isActivated: boolean;
    roles: array<string>
}
