import { ref, watch, computed, toRef } from 'vue';
import { useField } from 'vee-validate';
import { UiInputEmits, UiInputProps } from './UiInput.types.ts';
// Определение интерфейса для пропсов


// Функция, создающая составные объекты для UiInput
export function useUiInput(props: UiInputProps, emit: UiInputEmits) {
    const innerValue = ref(props.value);

    // Следим за изменениями входного значения и обновляем состояние
    watch(() => props.value, (value) => {
        innerValue.value = value;
        field.setValue(value);
    });

    // Инициализация useField для валидации
    const name = toRef(props, 'name');
    const field = useField(name, undefined, {
        initialValue: props.value
    });

    // Деструктуризация для получения нужных свойств и методов
    const { errorMessage, errors, handleBlur, handleChange } = field;

    const changeValue = (event: Event) => {
        handleChange(event);
        emit('update:value', innerValue.value);
    };

// Вычисляемое свойство для определения, есть ли ошибки
    const hasErrors = computed<boolean>(() => {
        return errors.value.length > 0;
    });

// Функция для создания классов корневого элемента
    const rootClasses = computed(() => ({
        disabled: props.disabled,
        'has-error text-red-500 border-2 border-rose-500 ': hasErrors.value,
        'readonly': props.readonly
    }));

    return {
        innerValue,
        changeValue,
        errorMessage,
        hasErrors,
        handleBlur,
        rootClasses
    };
}

