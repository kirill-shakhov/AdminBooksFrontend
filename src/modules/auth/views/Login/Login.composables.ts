import { computed, reactive, ref, watch } from "vue";
import { useRouter } from 'vue-router';


import AuthService from "../../services/AuthService.ts";
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { LoginTypes } from "./Login.types.ts";
import { AuthErrorResponse } from "../../models/response/AuthResponse.ts";


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

    const { handleSubmit, validate, errors, setFieldError } = useForm({
        validationSchema: schema
    });

    async function login() {
        try {
            status.value = 'pending';
            loading.value = true;

            const response = await AuthService.login(data.username, data.password);
            console.log(response);
            localStorage.setItem('token', response.accessToken);
            await router.push('/dashboard')

            status.value = 'success';
            loading.value = false;
        } catch (e) {

            const errors: AuthErrorResponse = e.response.data;
            setFieldError(errors.errors[0].field, errors.message);

            status.value = 'fail';
            loading.value = false;
        }

    }

    const onSubmit = handleSubmit(async (values) => {
        await login();
    })


    return {
        data,
        loading,
        status,

        onSubmit
    }
}