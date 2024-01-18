<template>
  <component
      :is="tag"
      :href="href"
      :disabled="disabled"
      :type="type"
      :class="rootClasses"
      class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <slot/>

  </component>
</template>

<script setup lang="ts">
import { UiButtonProps } from "./UiButton.types.ts";
import { UiButtonComposables } from './UiButton.composables.ts';

const props = withDefaults(defineProps<UiButtonProps>(), {
  disabled: false,
  type: 'button'
})

const {rootClasses, tag} = UiButtonComposables(props);

</script>

<style lang="scss">
.ui-button_disabled {
  cursor: not-allowed;
}
</style>