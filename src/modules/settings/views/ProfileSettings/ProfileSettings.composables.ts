import { reactive, ref } from "vue";
import { useAuth } from "../../../../shared/composables/useAuth/useAuth.ts";
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { profileService } from "../../services/ProfileService.ts";

import { useNotification } from "../../../../shared/components/UiNotification/UiNotification.composables.ts";
import { Profile } from "./ProfileSettings.types.ts";

const { notificationData, showNotification, } = useNotification();

const { user } = useAuth();

export function useProfileSettings() {

    const data = reactive<Profile>({
        firstName: user.value?.firstName || '',
        lastName: user.value?.lastName || '',
        email: user.value?.email || '',
        image: `${import.meta.env.VITE_API_URL}/${user.value?.image}`
    })

    const uploadedImgPreview = ref(`${import.meta.env.VITE_API_URL}/${user.value?.image}`)


    const schema = object().shape({
            firstName: string().required('firstName обязателен'),
            lastName: string().required('lastName обязателен'),
            email: string().required('email обязателен').email('некорректный email')
        }
    );

    const { handleSubmit } = useForm({
        validationSchema: schema
    });

    const collectFormData = () => {
        const formData = new FormData();

        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        return formData;
    }

    const changeProfileInfo = async (): Promise<void> => {
        try {
            const formData = collectFormData();
            const response = await profileService.changeProfile(formData);

            showNotification(response.message, 'success')
        } catch (e) {
            console.log(e);
            showNotification(e.response.data.message, 'error')
        }
    }


    const onSubmit = handleSubmit(async (): Promise<void> => {
        await changeProfileInfo();
    })


    return {
        data,
        onSubmit,
        notificationData,
        uploadedImgPreview
    }
}
