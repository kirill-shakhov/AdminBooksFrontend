export interface UiInputProps {
    name: string;
    type: string;
    value: string | number;
    placeholder?: string;
    label?: string;
    autocomplete?: boolean;
    disabled?: boolean;
    readonly?: boolean;
}

export interface UiInputEmits {
    (event: 'update:value', value: UiInputProps['value']): void;
    (event: 'change'): void;
}
