import AuthService from "../../../modules/auth/services/AuthService.ts";
import { ref } from "vue";

interface User {
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


    return {
        getUser,
        user
    }
}