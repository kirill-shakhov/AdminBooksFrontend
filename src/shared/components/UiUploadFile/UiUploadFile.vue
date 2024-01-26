<template>
  <div class="ui-upload-file flex flex-col items-center">
    <div v-if="image">
      <img :src="image" alt="Preview"
           class="w-40 h-40 p-1 object-cover rounded-full ring-2 ring-gray-300 dark:ring-gray-500"/>
    </div>

    <div class="mt-5">
      <label for="uploadFile1"
             class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Upload
        <input type="file" @change="handleFileChange" accept="image/*" id='uploadFile1' class="hidden"/>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';

const image = ref<string | ArrayBuffer>();
const emit = defineEmits<{
  (event: 'update:value', file: File): void;
}>();

function createImagePreview(file: File) {
  const reader = new FileReader();

  reader.onload = (e) => {
    if (e.target?.result) {
      image.value = e.target.result;
    }
  };

  reader.readAsDataURL(file);
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file && file.type.startsWith('image/')) {
    createImagePreview(file);
    emit('update:value', file)
  }
}

</script>

<style>
.preview-image {
}
</style>
