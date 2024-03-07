import $api from "@/services/api/helpers/createAxiosInstance.ts";

import { AuthorsResponse, BooksResponse, GenresResponse, UploadBookResponse } from "@/services/api/controllers/bookApi";
import { AxiosResponse } from "axios";
import { Book } from "@/modules/book/static/types";

class BookApi {
    async getUserBooks(): Promise<BooksResponse> {
        return $api.get<BooksResponse>(`/books`).then((response: AxiosResponse<BooksResponse>) => response.data)
    }

    async uploadNewBook(request: FormData) {
        return $api.post('/books/upload', request).then((response: AxiosResponse<UploadBookResponse>) => response.data);
    }

    async getBook(id: string): Promise<Book> {
        return $api.get<Book>(`/books/${id}`).then(response => response.data);
    }

    async deleteBook(id: string): Promise<string> {
        return $api.delete(`/books/${id}`).then(response => response.data);
    }

    async getGenres(): Promise<GenresResponse> {
        return $api.get(`/books/genres`).then((response: AxiosResponse<GenresResponse>) => response.data);
    }

    async getAuthors(): Promise<AuthorsResponse> {
        return $api.get(`/books/authors`).then((response: AxiosResponse<AuthorsResponse>) => response.data);
    }

}

export const bookApi = new BookApi();