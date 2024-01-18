import $api from "./helpers/createAxiosInstance.ts";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse.ts";
import { RegistrationRequest } from "../models/request/RegistrationRequest.ts";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`/login`, { username, password }).then(response => response.data)
    }

    static async registration(request: RegistrationRequest): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`auth/registration`, request).then(response => response.data);
    }

    // переписать регистрацию

    static async logout(): Promise<void> {
        await $api.post(`/logout`);
    }

}
