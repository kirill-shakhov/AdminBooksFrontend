import { useRequestWrapper } from "@/shared/composables/useRequestWrapper";
import { bookApi } from "@/services/api/controllers/bookApi";
import { ref } from "vue";
import { Book } from "@/modules/book/static/types";
import axios from "axios";
import { useRouter } from "vue-router";


export function usebookDetails(bookId: string) {
    const book = ref<Book | null>(null);
    const isOpenModal = ref<boolean>(false);

    const router = useRouter();
    console.log(bookId)

    interface MimeTypes {
        [key: string]: string;
    }

    const mimeTypes: MimeTypes = {
        '.epub': 'application/epub+zip',
        '.mobi': 'application/x-mobipocket-ebook',
        '.azw': 'application/vnd.amazon.ebook',
        '.pdf': 'application/pdf',
        '.fb2': 'application/x-fictionbook+xml',
        '.txt': 'text/plain',
        '.html': 'text/html',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };


    const [fetchData, isFetchDataLoading] = useRequestWrapper(async () => {
            book.value = await bookApi.getBook(bookId);
    })

// Функция для определения MIME-типа файла по его URL
    const getMimeType = (url: string): string => {
        const extension = url.slice(url.lastIndexOf('.'));
        return mimeTypes[extension] || 'application/octet-stream'; // 'application/octet-stream' как тип по умолчанию
    };


    const downloadBook = async () => {
        try {
            const response = await axios({
                url: book.value?.book,
                method: 'GET',
                responseType: 'blob', // Получение файла в формате Blob
            });

            // Определение MIME-типа на основе URL файла
            const mimeType = getMimeType((book.value?.book as string));

            // Создание URL для скачивания файла с определённым MIME-типом
            const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));
            const link = document.createElement('a');
            link.href = url;
            const fileName = book.value?.title || 'downloadedBook';
            const fileExtension = mimeType.split('/')[1].split('+')[0]; // Простая попытка извлечь расширение из MIME-типа
            link.setAttribute('download', `${fileName}.${fileExtension}`); // Добавление расширения файла к названию
            document.body.appendChild(link);
            link.click(); // Инициирование скачивания

            // Очистка после скачивания
            window.URL.revokeObjectURL(url);
            link.remove();
        } catch (error) {
            console.error('Ошибка скачивания файла:', error);
        }
    };


    const openModal = (): void => {
        isOpenModal.value = true;
    }

    const handleModalChange = (newState: boolean): void => {
        isOpenModal.value = newState;
    };

    const deleteBook = async () => {
        try {
            await bookApi.deleteBook(bookId);
            await router.push({ name: 'library' })
        } catch (e) {
            console.log(e);
        }
    }

    return {
        book,
        isOpenModal,
        downloadBook,
        openModal,
        handleModalChange,
        deleteBook,

        fetchData,
        isFetchDataLoading
    }
}