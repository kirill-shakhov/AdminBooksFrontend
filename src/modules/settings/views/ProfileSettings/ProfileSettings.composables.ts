import { reactive } from "vue";
import { useAuth } from "../../../../shared/composables/useAuth/useAuth.ts";

const { user } = useAuth();

export function useProfileSettings() {

    const data = reactive({
        firstname: user.value?.firstName || '',
        lastname: user.value?.lastName || '',
        email: user.value?.email || '',
        img: `${import.meta.env.VITE_API_URL}/${user.value?.image}`
    })

    return {
        data
    }
}
