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

export interface AsyncSelectEmits<T> {
    (event: 'update:model-value', value: T): void;
    (event: 'change'): void;
}