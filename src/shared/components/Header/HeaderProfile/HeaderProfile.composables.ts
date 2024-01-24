import { reactive } from "vue";
import { HeaderProfileData } from "./HeaderProfile.types.ts";

import { useAuth } from "../../../composables/useAuth/useAuth.ts";
import { useRouter } from 'vue-router';

import AuthService from "../../../../modules/auth/services/AuthService.ts";

export function HeaderProfileComposables() {
    const router = useRouter();
    const { user } = useAuth();


    const headerProfileData = reactive<HeaderProfileData>({
        user: {
            fullName: `${user.value?.firstName} ${user.value?.lastName}`,
            email: `${user.value?.email}`,
            image: `http://localhost:5000/${user.value?.image}`
        },
        pages: [
            {
                name: "Settings",
                link: "/settings"
            }
        ]
    });

    const logout = async (): Promise<void> => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            await router.push('/login');

        } catch (e) {
            console.log(e);
        }
    }

    return {
        headerProfileData,
        logout
    };
}
