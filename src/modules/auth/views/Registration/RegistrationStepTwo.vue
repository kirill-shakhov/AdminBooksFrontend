<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <ui-upload-file id="5"
                  v-model:value="props.formData.image"
  />
</template>

<script lang="ts" setup>
import UiUploadFile from "../../../../shared/components/UiUploadFile/UiUploadFile.vue";

interface FormData {
  image: File | null
}

const props = defineProps<{
  formData: FormData;
}>();

</script>

<style></style>