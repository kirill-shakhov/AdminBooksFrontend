import $api from "@/services/api/helpers/createAxiosInstance.ts";
import { AxiosResponse } from 'axios';
import { CheckUserResponse, CheckUserRequest, AuthResponse } from './authApi.types.ts'

import { User } from "@/shared/composables/useAuth/useAuth.ts";

class AuthApi {
    async login(username: string, password: string): Promise<AuthResponse> {
        return $api.post<AuthResponse>(`auth/login`, {
            username,
            password
        }).then((response: AxiosResponse<AuthResponse>) => response.data)
    }

    async registration(request: FormData): Promise<AuthResponse> {
        return $api.post<AuthResponse>(`auth/registration`, request).then((response: AxiosResponse<AuthResponse>) => response.data);
    }

    async logout(): Promise<void> {
        await $api.post(`/auth/logout`);
    }

    async checkUser(request: CheckUserRequest): Promise<CheckUserResponse> {
        return $api.post<CheckUserResponse>(`auth/check-user`, request).then((response: AxiosResponse<CheckUserResponse>) => response.data)
    }

    async getUser(): Promise<User> {
        return $api.get<User>(`/profile`,).then((response: AxiosResponse<User>) => response.data)
    }

    async refresh(): Promise<AuthResponse> {
        return $api.get<AuthResponse>(`/auth/refresh`).then((response: AxiosResponse<AuthResponse>) => response.data)
    }
}

export const authApi = new AuthApi();