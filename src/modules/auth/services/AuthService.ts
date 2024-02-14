import $api from "./../../../services/api/helpers/createAxiosInstance.ts";
import { AxiosResponse } from 'axios';
import { CheckUserResponse, CheckUserRequest, AuthResponse } from '../types/index.ts'

import { User } from "../../../shared/composables/useAuth/useAuth.ts";

export default class AuthService {
    static async login(username: string, password: string): Promise<AuthResponse> {
        return $api.post<AuthResponse>(`auth/login`, {
            username,
            password
        }).then((response: AxiosResponse<AuthResponse>) => response.data)
    }

    static async registration(request: FormData): Promise<AuthResponse> {
        return $api.post<AuthResponse>(`auth/registration`, request).then((response: AxiosResponse<AuthResponse>) => response.data);
    }

    // переписать регистрацию

    static async logout(): Promise<void> {
        await $api.post(`/auth/logout`);
    }

    static async checkUser(request: CheckUserRequest): Promise<CheckUserResponse> {
        return $api.post<CheckUserResponse>(`auth/check-user`, request).then((response: AxiosResponse<CheckUserResponse>) => response.data)
    }

    static async getUser(): Promise<User> {
        return $api.get<User>(`/profile`,).then((response: AxiosResponse<User>) => response.data)
    }

    static async refresh(): Promise<AuthResponse> {
        return $api.get<AuthResponse>(`/auth/refresh`).then((response: AxiosResponse<AuthResponse>) => response.data)
    }
}
