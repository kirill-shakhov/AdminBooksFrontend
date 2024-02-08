<template>
  <component
      :is="tag"
      :href="href"
      :disabled="disabled"
      :type="type"
      :loading="loading"
      :class="rootClasses"
      class="flex justify-center items-center  px-3 py-1.5  font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
  >
    <div v-if="loading">
        <ui-progress-circular/>
    </div>

    <slot/>

  </component>
</template>

<script setup lang="ts">
import { UiButtonProps } from "./UiButton.types.ts";
import { UiButtonComposables } from './UiButton.composables.ts';
import UiProgressCircular from "../UiProgressCircular/UiProgressCircular.vue";

const props = withDefaults(defineProps<UiButtonProps>(), {
  disabled: false,
  type: 'button',
  loading: false,
  size: 'sm',
  block: false,
  theme: 'primary'
})

const { rootClasses, tag } = UiButtonComposables(props);

</script>

<style lang="scss">
.ui-button_disabled {
  cursor: not-allowed;
}
</style>