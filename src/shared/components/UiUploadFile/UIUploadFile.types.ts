export type UploadTYpe = 'avatar' | 'book' | 'bookImage';
export interface Props {
    uploadedImgPreview?: string,
    type?: UploadTYpe;
    id: string;
}