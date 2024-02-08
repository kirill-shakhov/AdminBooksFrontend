export interface UploadBookData {
    title: string;
    genreName: string;
    authorName: string;
    image: File | null;
    book: File | null;
}