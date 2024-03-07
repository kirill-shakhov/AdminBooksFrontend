import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';


import { object, string } from "yup";
import { useForm } from "vee-validate";
import { LoginTypes } from "./Login.types.ts";
import axios from 'axios';
import { authApi } from "@/services/api/controllers/authApi";


export function loginComposables() {
    const router = useRouter();

    let data = reactive<LoginTypes>({
        username: '',
        password: '',
    })

    const loading = ref<boolean>(false)
    const status = ref<'initial' | 'pending' | 'success' | 'fail'>('initial');

    const schema = object().shape({
            username: string().required('username обязателен'),
            password: string().required('password обязателен'),
        }
    );

    const { handleSubmit, setFieldError } = useForm({
        validationSchema: schema
    });

    async function login() {
        try {
            status.value = 'pending';
            loading.value = true;

            const response = await authApi.login(data.username, data.password);
            localStorage.setItem('token', response.accessToken);
            await router.push('/')

            status.value = 'success';
            loading.value = false;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data) {
                    const errors = e?.response?.data;

                    setFieldError(errors.errors[0].field, errors.message);
                } else {
                    setFieldError('username', 'API error');
                }
            }

            status.value = 'fail';
            loading.value = false;
        }

    }

    const onSubmit = handleSubmit(async () => {
        await login();
    })


    return {
        data,
        loading,
        status,

        onSubmit
    }
}
