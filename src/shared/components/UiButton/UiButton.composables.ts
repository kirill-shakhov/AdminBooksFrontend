import { UiButtonProps } from "./UiButton.types.ts";
import { computed } from "vue";

export function UiButtonComposables(props: UiButtonProps) {

    const rootClasses = computed(() => [
        {
            'ui-button_disabled bg-indigo-300 hover:bg-indigo-300': props.disabled,
            'w-full': props.block,
            'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"': props.theme === 'danger',
            'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600': props.theme === 'primary',
            'font-semibold leading-6 text-gray-500 border': props.theme === 'secondary',
            'text-sm shadow-sm rounded-md': props.size === 'sm',
            'text-md shadow-md rounded-lg px-6 py-3': props.size === 'md',
            'text-lg shadow-lg rounded-xl px-12 py-6': props.size === 'lg',
        }
    ]);

    const tag = computed(() => {
        if (props.href) {
            return 'a';
        }

        return 'button';
    })

    return {
        rootClasses,
        tag
    }
}