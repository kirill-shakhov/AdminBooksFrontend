
export interface Book {
    _id: string;
    title: string;
    image: string;
    book: string;
    genre: {
        name: string;
    };
    author: {
        name: string;
    };
}

export interface BooksResponse {
    books: Book[];
}

export interface UploadBookResponse {
    message: string,
    book: {
        title: string,
        image: string,
        book: string,
        genre: string,
        author: string,
        user: string,
        _id: string,
        __v:number
    }
}

export interface UploadBookErrorResponse {
    message: string;
}