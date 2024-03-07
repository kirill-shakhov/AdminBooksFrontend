<template>
  <div class="overflow-hidden bg-white w-full py-11">
    <div
        v-if="isFetchDataLoading"
        class="h-full flex items-center justify-center"
    >
      <book-details-skeleton/>
    </div>

    <div v-else
         class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full px-4 md:w-1/2 ">
          <div class="overflow-hidden">
            <div class="relative mb-6 lg:mb-10 lg:h-2/4 ">
              <img :src='book?.image' alt=""
                   class="object-cover w-full lg:h-full ">
            </div>
          </div>
        </div>
        <div class="w-full px-4 md:w-1/2 ">
          <div class="lg:pl-20">
            <div class="mb-8 ">
              <div class="flex justify-between">
                <span class="text-lg font-medium text-rose-500 dark:text-rose-200">New</span>

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
              <div class="w-full px-4 mb-4 lg:w-1/2 lg:mb-4 order-1 lg:order-1">
                <UiButton
                    @click="downloadBook"
                    block
                    type="button"
                >
                  Download
                </UiButton>
              </div>

              <div class="w-full px-4 mb-4 lg:mb-4 lg:w-1/2 order-3 lg:order-2">
                <UiButton
                    @click="openModal"
                    block
                    theme="danger"
                    type="button"
                >
                  Delete
                </UiButton>
              </div>

              <div class="w-full px-4 mb-4 lg:mb-4 order-2 lg:order-3">
                <UiButton
                    :href="book?.book"
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
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { UiButton } from "@/shared/components/UiButton";

import { DialogTitle } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

import { UiModal } from "@/shared/components/UiModal";
import BookDetailsSkeleton from "./BookDetailsSkeleton/BookDetailsSkeleton.vue";
import { usebookDetails } from "@/modules/book/views/BookDetails/BookDetails.composables.ts";

const route = useRoute();
const bookId = route.params.bookId as string;

const {
  book,
  isOpenModal,
  downloadBook,
  openModal,
  handleModalChange,
  deleteBook,

  fetchData,
  isFetchDataLoading
} = usebookDetails(bookId);

onMounted(fetchData);


</script>