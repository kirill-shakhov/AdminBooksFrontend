import { reactive, ref, watch } from "vue";
import { RegistrationData } from './Registration.types.ts'
import AuthService from "../../services/AuthService.ts";
import { object, string } from "yup";
import { useForm } from "vee-validate";

export function registrationComposables() {
    let data = reactive<RegistrationData>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        image: '',
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

    const { handleSubmit, validate, errors, setFieldError } = useForm({
        validationSchema: schema
    });


    const collectFormData = () => {
        return {
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        };
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

    const checkUser = async () => {
        try {
            const response = await AuthService.checkUser({ username: data.username });
            return response.exists;
        } catch (e) {
            console.log(e);
        }
    }

    const validateFirstStep = async () => {
        const isValid = await validate();
        console.log("Результат валидации:", isValid.valid);

        if (!isValid.valid) {
            console.log("Ошибки валидации:", errors.value);
            // Действия в случае, если форма не прошла валидацию
            return;
        }

        const isUserExists = await checkUser();

        if (isUserExists) {
            setFieldError('username', 'Пользователь с таким именем уже существует')
            return;
        }

        nextStep();

    }

    async function registrationNewUser() {
        try {
            status.value = 'pending';
            loading.value = true;

            const formData = collectFormData();
            const response = await AuthService.registration(formData);
            console.log(response);
            status.value = 'success';
        } catch (e) {
            console.log(e);
            status.value = 'fail';
        }

    }

    const onSubmit = handleSubmit(async (values) => {
        await registrationNewUser();
    })


    return {
        data,
        validateFirstStep,
        previousStep,
        onSubmit
    }
}