import { reactive, watch } from "vue";
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

    const schema = object().shape({
            username: string().required('username обязателен'),
            password: string().required('password обязателен'),
            firstName: string().required('firstName обязателен'),
            lastName: string().required('lastName обязателен'),
            email: string().required('email обязателен').email('некорректный email')
        }
    );

    const { handleSubmit,errors } = useForm({
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


    async function registrationNewUser() {
        try {
            const formData = collectFormData();
            const response = await AuthService.registration(formData);
            console.log(response);
        } catch (e) {
            console.log(e);
        }

    }

    const onSubmit = handleSubmit(async (values) => {
        await registrationNewUser();
    })


    return {
        data,
        nextStep,
        previousStep,
        onSubmit
    }
}