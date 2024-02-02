import { reactive } from "vue";
import { HeaderProfileData } from "./HeaderProfile.types.ts";

import { useAuth } from "../../../composables/useAuth/useAuth.ts";
import { useRouter } from 'vue-router';

import AuthService from "../../../../modules/auth/services/AuthService.ts";

export function HeaderProfileComposables() {

    const { user } = useAuth();


    const headerProfileData = reactive<HeaderProfileData>({
        user: {
            fullName: `${user.value?.firstName} ${user.value?.lastName}`,
            email: `${user.value?.email}`,
            image: `${import.meta.env.VITE_API_URL}/${user.value?.image}`
        },
        pages: [
            {
                name: "Settings",
                link: "/settings"
            }
        ]
    });


    return {
        headerProfileData,
    };
}
