import { reactive, ref } from "vue";
import { useAuth } from "@/shared/composables/useAuth/useAuth.ts";
import { object, string } from "yup";
import { useForm } from "vee-validate";

import { useNotification } from "@/shared/components/UiNotification/UiNotification.composables.ts";
import { Profile } from "./ProfileSettings.types.ts";
import { AxiosError } from "axios";
import { profileApi, UpdateProfileErrorResponse } from "@/services/api/controllers/profileApi";

const { notificationData, showNotification, } = useNotification();

const { user } = useAuth();

export function useProfileSettings() {

    const data = reactive<Profile>({
        firstName: user.value?.firstName || '',
        lastName: user.value?.lastName || '',
        email: user.value?.email || '',
        image: `${user.value?.image}`,
        imageFile: null
    })

    const uploadedImgPreview = ref(`${user.value?.image}`)


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

        if (data.imageFile !== null) {
            formData.append('image', data.imageFile);
        }

        return formData;
    }

    const changeProfileInfo = async (): Promise<void> => {
        try {
            const formData = collectFormData();
            const response = await profileApi.changeProfile(formData);

            showNotification(response.message, 'success')
        } catch (e: unknown) {

            const axiosError = e as AxiosError<UpdateProfileErrorResponse>;
            if (axiosError.response?.data?.message) {
                showNotification(axiosError.response.data.message, 'error');
            } else {
                // Если нет, выводим общее сообщение об ошибке
                console.log(e);
                showNotification('Произошла неизвестная ошибка', 'error');
            }
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
