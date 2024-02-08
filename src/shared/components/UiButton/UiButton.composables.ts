import { UiButtonProps } from "./UiButton.types.ts";
import { computed } from "vue";

export function UiButtonComposables(props: UiButtonProps) {

    const rootClasses = computed(() => [
        {
            'ui-button_disabled bg-indigo-300 hover:bg-indigo-300': props.disabled,
            'w-full': props.block,
            'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"': props.theme === 'danger',
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