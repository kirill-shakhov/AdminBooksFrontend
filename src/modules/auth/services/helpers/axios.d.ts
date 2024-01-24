// axios.d.ts
declare module 'axios' {
    export interface AxiosRequestConfig {
        // Дополнительные или измененные свойства
        _isRetry?: boolean;
        withCredentials?: boolean; // Добавляем сюда свойство withCredentials
    }
}
