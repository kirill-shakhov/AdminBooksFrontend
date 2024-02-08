export interface UiButtonProps {
    href?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
    block?: boolean;
    theme?: 'danger' | 'primary' | 'secondary';
}