import AuthService from "../../../modules/auth/services/AuthService.ts";
import { ref } from "vue";

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
    const getUser = async () => {
        try {
            user.value = await AuthService.getUser();
        } catch (e) {
            console.log(e);
        }
    }

    function hasAccess(roles, permissions) {
        return roles.some(role => permissions.includes(role));
    }


    return {
        getUser,
        user,
        hasAccess
    }
}