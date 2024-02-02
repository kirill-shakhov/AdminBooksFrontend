// useNotification.ts
import { reactive } from 'vue';
import { NotificationData } from "./UiNotification.types.ts";

export function useNotification() {
    const notificationData = reactive<NotificationData>({
        message: '',
        status: 'initial' as 'initial' | 'error' | 'success'
    });

    const showNotification = (message: string, status: 'initial' | 'error' | 'success'): void => {
        notificationData.message = message;
        notificationData.status = status;

        setTimeout((): void => {
            notificationData.status = 'initial';
        }, 5000);
    };

    return { notificationData, showNotification };
}
