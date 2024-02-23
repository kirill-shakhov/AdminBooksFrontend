<template>
  <div class="ui-upload-file flex flex-col items-center">
    <div v-if="avatarPreview">
      <img :src="avatarPreview" alt="Preview"
           class="w-40 h-40 p-1 object-cover rounded-full ring-2 ring-gray-300 dark:ring-gray-500"/>
    </div>

    <div class="mt-5">
      <label :for="`uploadFile-${id}`"
             class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Upload
        <input type="file" @change="handleFileChange" :accept="acceptedTypes" :id="`uploadFile-${id}`" class="hidden"/>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue';
import { Props } from "./UIUploadFile.types.ts";

const avatarPreview = ref<string>('');


const props = defineProps<Props>()
if (props.uploadedImgPreview) avatarPreview.value = props.uploadedImgPreview;

const emit = defineEmits<{
  (event: 'update:value', file: File): void;
}>();

const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
const acceptedDocumentTypes = [
  'application/epub+zip',
  'application/x-mobipocket-ebook',
  'application/vnd.amazon.ebook',
  'application/pdf',
  'application/x-fictionbook+xml',
  'text/plain',
  'text/html',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const acceptedTypes = computed(() => [...acceptedImageTypes, ...acceptedDocumentTypes].join(','));

function createImagePreview(file: File) {
  const reader = new FileReader();

  reader.onload = (e) => {
    if (typeof e.target?.result === 'string') {
      avatarPreview.value = e.target.result;
    }
  };

  reader.readAsDataURL(file);
}

function isAcceptedFileType(fileType: string): boolean {
  return acceptedImageTypes.includes(fileType) || acceptedDocumentTypes.includes(fileType);
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  console.log(file);
  if (file && isAcceptedFileType(file.type)) {
    if (file.type.startsWith('image/')) {
      createImagePreview(file);
    }

    emit('update:value', file);
  } else {
    // Ошибка или уведомление о неподдерживаемом формате файла
    console.error('Unsupported file type');
  }
}

</script>

<style>
</style>
