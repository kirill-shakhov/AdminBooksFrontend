<template>
  <UIField :label="label">
    <input
        v-model="innerValue"
        :autocomplete="autocomplete ? 'on' : 'off'"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="type"
        class="block w-full  rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :class="rootClasses"
        @blur="handleBlur"
        @input="changeValue"
    />

    <transition name="fade">
      <div v-if="errorMessage">
        <div class="text-red-500">
          {{ errorMessage }}
        </div>
      </div>
    </transition>

  </UIField>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import UIField from "../UiField/UIField.vue";
import { UiInputProps } from './UiInput.types.ts'
import { UiInputComposables } from './UiInput.composables.ts'

const emit = defineEmits(['update:value']);


const props = withDefaults(defineProps<UiInputProps>(), {
  placeholder: '',
  type: 'text',
  name: '',
  label: '',
  autocomplete: false,
  readonly: false
})


const { innerValue, changeValue, errorMessage, hasErrors, handleBlur, rootClasses } = UiInputComposables(props, emit);
</script>

<style lang="scss">
/* Стили для анимации сообщения об ошибке */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.error-message {
  color: red;
  margin-top: 5px;
  font-size: 0.9em;
}

</style>