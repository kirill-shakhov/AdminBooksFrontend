import { reactive } from "vue";
import { useAuth } from "../../../../shared/composables/useAuth/useAuth.ts";

const { user } = useAuth();

export function profileSettingsComposables() {

    const data = reactive({
        firstname: user.value?.firstName,
        lastname: user.value?.lastName,
        email: user.value?.email,
        img: `http://localhost:5000/${user.value?.image}`
    })

    return {
        data
    }
}