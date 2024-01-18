<template>
  <div>
    <label v-if="label" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>

    <div class="mt-2">
      <slot/>
    </div>
  </div>

</template>

<script lang="ts" setup>
interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: '',
});
</script>
