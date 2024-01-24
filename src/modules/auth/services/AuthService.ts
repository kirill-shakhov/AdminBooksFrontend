import $api from "./helpers/createAxiosInstance.ts";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse.ts";
import { RegistrationRequest } from "../models/request/RegistrationRequest.ts";
import { CheckUserRequest } from "../models/request/CheckUserRequest.ts";
import { CheckUserResponse } from "../models/response/CheckUserResponse.ts";

export default class AuthService {
    static async login(username: string, password: string): Promise<AuthResponse> {
        return $api.post<AuthResponse>(`auth/login`, { username, password }).then(response => response.data)
    }

    static async registration(request: RegistrationRequest): Promise<AuthResponse> {
        return $api.post<AuthResponse>(`auth/registration`, request).then(response => response.data);
    }

    // переписать регистрацию

    static async logout(): Promise<void> {
        await $api.post(`/logout`);
    }

    static async checkUser(request: CheckUserRequest): Promise<CheckUserResponse> {
        return $api.post<CheckUserResponse>(`auth/check-user`, request).then(response => response.data)
    }

    static async getUser() {
        return $api.get(`/profile`,).then(response => response.data)
    }
}
