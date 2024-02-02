import { computed, reactive, ref } from "vue";
import { useRouter } from 'vue-router';


import AuthService from "../../services/AuthService.ts";
import { object, string } from "yup";
import { useForm } from "vee-validate";

import { RegistrationData } from './Registration.types.ts'
import { CheckUserResponse } from "../../models/response/CheckUserResponse.ts";


export function registrationComposables() {
    const router = useRouter();

    let data = reactive<RegistrationData>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        image: null,
        currentStep: 1,
    })

    const loading = ref<boolean>(false)
    const status = ref<'initial' | 'pending' | 'success' | 'fail'>('initial');

    const schema = object().shape({
            username: string().required('username обязателен'),
            password: string().required('password обязателен'),
            firstName: string().required('firstName обязателен'),
            lastName: string().required('lastName обязателен'),
            email: string().required('email обязателен').email('некорректный email')
        }
    );

    const { handleSubmit, validate, setFieldError } = useForm({
        validationSchema: schema
    });


    // const collectFormData = () => {
    //     return {
    //         username: data.username,
    //         password: data.password,
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         email: data.email
    //     };
    // }

    const collectFormData = () => {
        const formData = new FormData();

        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        return formData;
    }


    const nextStep = (): void => {
        if (data.currentStep < 2) {
            data.currentStep++;
        }
    }

    const previousStep = (): void => {
        if (data.currentStep > 0) {
            data.currentStep--;
        }
    }

    const displayCurrentStep = computed((): string => {
        return `Step ${data.currentStep}/2`
    })

    const checkUser = async () => {
        try {
            const response: CheckUserResponse = await AuthService.checkUser({ username: data.username });
            return response.exists;
        } catch (e) {
            console.log(e);
        }
    }

    const validateFirstStep = async () => {
        loading.value = true;
        const isValid = await validate();

        if (!isValid.valid) {
            loading.value = false;
            // Действия в случае, если форма не прошла валидацию
            return;
        }

        const isUserExists = await checkUser();

        if (isUserExists) {
            loading.value = false;
            setFieldError('username', 'Пользователь с таким именем уже существует')
            return;
        }

        nextStep();
        loading.value = false;

    }

    async function registrationNewUser() {
        try {
            status.value = 'pending';
            loading.value = true;

            const formData = collectFormData();
            const response = await AuthService.registration(formData);
            console.log(response);
            localStorage.setItem('token', response.accessToken);
            await router.push('/')

            status.value = 'success';
            loading.value = false;
        } catch (e) {
            console.log(e);

            status.value = 'fail';
            loading.value = false;
        }

    }

    const onSubmit = handleSubmit(async () => {
        await registrationNewUser();
    })


    return {
        data,
        loading,
        status,

        displayCurrentStep,
        validateFirstStep,
        previousStep,

        onSubmit
    }
}
