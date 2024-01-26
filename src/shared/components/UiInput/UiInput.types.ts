export interface UiInputProps {
    label?: string;
    name: string;
    placeholder?: string;
    type: string;
    value: string | number;
    autocomplete?: boolean;
    disabled?: boolean;
    readonly?: boolean;
}

export interface UiInputEmits {
    (event: 'update:value', value: string | number): void;
    (event: 'change'): void;
}
