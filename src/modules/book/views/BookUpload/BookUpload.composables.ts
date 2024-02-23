import { onMounted, reactive, ref } from "vue";
import { UploadBookData } from "./BookUpload.types.ts";
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { useNotification } from "../../../../shared/components/UiNotification/UiNotification.composables.ts";
import { bookService } from "../../services/bookService.ts";
import { AxiosError } from "axios";
import { Author, Genre, UploadBookErrorResponse } from "../../types";

const { notificationData, showNotification, } = useNotification();
const loading = ref(false);

export function useBookUpload() {

    const recentGenres = ref<null | Genre[]>(null);
    const recentAuthors = ref<null | Author[]>(null);
    ``
    const getRecentGenres = async (): Promise<void> => {
        try {
            const { genres } = await bookService.getGenres();
            recentGenres.value = genres;
        } catch (e) {
            console.log(e);
            recentGenres.value = [];
        }
    }
    const getRecentAuthors = async (): Promise<void> => {
        try {
            const { authors } = await bookService.getAuthors();
            recentAuthors.value = authors;

        } catch (e) {
            console.log(e);
            recentAuthors.value = [];
        }
    }

    onMounted(async () => {
        console.log('старт');
        await getRecentGenres();
        await getRecentAuthors();
    })

    const data = reactive<UploadBookData>({
        title: '',
        genreName: '',
        authorName: '',
        image: null,
        book: null
    })

    const schema = object().shape({
            title: string().required('title обязателен'),
            genreName: string().required('genreName обязателен'),
            authorName: string().required('authorName обязателен'),
        }
    );

    const { handleSubmit } = useForm({
        validationSchema: schema
    });

    const collectFormData = (): FormData => {
        const formData: FormData = new FormData();

        formData.append('title', data.title);
        formData.append('genreName', data.genreName);
        formData.append('authorName', data.authorName);

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }
        if (data.book instanceof File) {
            formData.append('book', data.book);
        }

        return formData;
    }

    const uploadBook = async (): Promise<void> => {
        try {
            loading.value = true;

            const formData = collectFormData();
            const response = await bookService.uploadNewBook(formData);

            loading.value = false;
            showNotification(response.message, 'success')
        } catch (e) {
            loading.value = false;
            const axiosError = e as AxiosError<UploadBookErrorResponse>;
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
        await uploadBook();
    })


    return {
        data,
        onSubmit,
        notificationData,
        loading,
        recentGenres,
        recentAuthors
    }
}