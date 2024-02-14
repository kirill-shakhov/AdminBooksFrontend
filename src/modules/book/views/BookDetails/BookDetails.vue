<template>
  <div class="overflow-hidden bg-white w-full py-11">
    <div
        v-if="loading"
        class="h-full flex items-center justify-center"
    >
      <ui-progress-circular/>
    </div>

    <div v-else
         class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4 md:w-1/2 ">
          <div class="overflow-hidden">
            <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
              <img :src='bookImage' alt=""
                   class="object-cover w-full lg:h-full ">
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 ">
          <div class="lg:pl-20">
            <div class="mb-8 ">
              <div class="flex justify-between">
                <span class="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>
<!--                <ui-button-->
<!--                    theme="secondary"-->
<!--                    type="button"-->
<!--                >-->
<!--                  edit-->
<!--                </ui-button>-->
              </div>
              <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold md:text-4xl"> {{ book?.title }} </h2>
              <p class="max-w-md text-gray-700 dark:text-gray-400">
                Genre: {{ book?.genre.name }}
              </p>

              <p class="max-w-md text-gray-700 dark:text-gray-400">
                Author: {{ book?.author.name }}
              </p>

            </div>
            <div class="flex flex-wrap items-center -mx-4">
              <div class="w-full px-4 mb-4 lg:w-1/2 lg:mb-4 sm:order-1 md:order-1">
                <UiButton
                    @click="downloadBook"
                    block
                    type="button"
                >
                  Download
                </UiButton>
              </div>

              <div class="w-full px-4 mb-4 lg:mb-4 lg:w-1/2  sm:order-3 md:order-2">
                <UiButton
                    @click="openModal"
                    block
                    theme="danger"
                    type="button"
                >
                  Delete
                </UiButton>
              </div>

              <div class="w-full px-4 mb-4 lg:mb-4 sm:order-2 md:order-3">
                <UiButton
                    :href="bookFile"
                    target="_blank"
                    block
                    type="button"
                >
                  Read
                </UiButton>
              </div>

            </div>
          </div>
        </div>
      </div>

      <ui-modal
          :is-open="isOpenModal"
          @update:isOpen="handleModalChange"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true"/>
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Delete a book
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Are you sure you want to delete your book? All of your
                  data will be permanently removed. This action cannot be undone.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="deleteBook">Delete
          </button>
          <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="isOpenModal = false" ref="cancelButtonRef">Cancel
          </button>
        </div>
      </ui-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { bookService } from "../../services/bookService.ts";
import { Book } from "../../types";
import UiProgressCircular from "../../../../shared/components/UiProgressCircular/UiProgressCircular.vue";
import UiButton from "../../../../shared/components/UiButton/UiButton.vue";
import axios from "axios";

import { DialogTitle } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

import UiModal from "../../../../shared/components/UiModal/UiModal.vue";

const route = useRoute();
const router = useRouter();

const book = ref<Book | null>(null);
const bookImage = ref<string>('');
const bookFile = ref<string>('');
const loading = ref<boolean>(true);
const isOpenModal = ref<boolean>(false);
const bookId = route.params.bookId as string;

onMounted(async () => {

  try {
    book.value = await bookService.getBook(bookId);
    if (book.value?.image) bookImage.value = `${import.meta.env.VITE_API_URL}/${book.value?.image}`
    if (book.value?.book) bookFile.value = `${import.meta.env.VITE_API_URL}/${book.value?.book}`
    loading.value = false;

  } catch (error) {
    console.error("Ошибка при загрузке книги:", error);
  }
})


const downloadBook = async () => {
  try {
    const response = await axios({
      url: bookFile.value,
      method: 'GET',
      responseType: 'blob', // Получение файла в формате Blob
    });

    // Создание URL для скачивания файла
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', book.value?.title || 'downloadedBook'); // Название файла для скачивания
    document.body.appendChild(link);
    link.click(); // Инициирование скачивания

    // Очистка после скачивания
    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error) {
    console.error('Ошибка скачивания файла:', error);
  }
};


const openModal = (): void => {
  isOpenModal.value = true;
}

const handleModalChange = (newState: boolean): void => {
  isOpenModal.value = newState;
};

const deleteBook = async () => {
  try {
    await bookService.deleteBook(bookId);
    await router.push({ name: 'library' })
  } catch (e) {
    console.log(e);
  }
}

</script>