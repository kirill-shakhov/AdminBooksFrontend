import $api from "../../../services/api/helpers/createAxiosInstance.ts";
import { Book, BooksResponse } from "../types";

class BookService {
    async getUserBooks(): Promise<BooksResponse> {
        return $api.get<BooksResponse>(`/books`).then(response => response.data)
    }

    async uploadNewBook(request: FormData) {
        return $api.post('/books/upload', request).then(response => response.data);
    }

    async getBook(id: string): Promise<Book> {
        return $api.get<Book>(`/books/${id}`).then(response => response.data);
    }

    async deleteBook(id: string): Promise<string>  {
        return $api.delete(`/books/${id}`).then(response => response.data);
    }

}

const bookService = new BookService();

export { bookService };