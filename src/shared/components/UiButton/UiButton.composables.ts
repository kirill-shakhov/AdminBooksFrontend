import { UiButtonProps } from "./UiButton.types.ts";
import { computed } from "vue";

export function UiButtonComposables(props: UiButtonProps) {

    const rootClasses = computed(() => [
        {
            'ui-button_disabled bg-indigo-300 hover:bg-indigo-300': props.disabled,
            'w-full': props.block
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