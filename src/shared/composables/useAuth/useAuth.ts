import { authApi } from "@/services/api/controllers/authApi";

import { ref } from "vue";
import { useRouter } from "vue-router";


export interface User {
    activationLink: string;
    email: string;
    username: string;
    firstName: string;
    image: string;
    isActivated: string;
    lastName: string;
    roles: Array<string>;
}


const user = ref<User | null>(null);

export const useAuth = () => {
    const router = useRouter();

    const getUser = async (): Promise<void> => {
        try {
            user.value = await authApi.getUser();
        } catch (e) {
            console.log(e);
        }
    }

    function hasAccess(roles: string[], permissions: string[]): boolean {
        return roles.some(role => permissions.includes(role));
    }

    const logout = async (): Promise<void> => {
        try {
            await authApi.logout();
            localStorage.removeItem('token');
            await router.push('/login');

        } catch (e) {
            console.log(e);
        }
    }

    return {
        getUser,
        user,
        hasAccess,
        logout
    }
}
