<template>
  <form class="w-full py-1 md:w-2/3 lg:w-3/4" action="#" @submit.prevent='onSubmit'>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Upload new book</h2>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <div class="flex flex-col gap-4">
          <div class="sm:col-span-3">
            <UiInput
                v-model:value="data.title"
                label="Title"
                name="title"
                type="text"/>
          </div>

          <div class="sm:col-span-3">
            <UiInput
                v-model:value="data.genreName"
                label="Genre"
                name="genreName"
                type="text"
            />

            <div class="mt-2">
              <RecentItemsSelector
                  v-if="recentGenres"
                  :list="recentGenres"
                  @select="setGenreName"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <UiInput
                v-model:value="data.authorName"
                label="Author"
                name="authorName"
                type="text"/>

            <div class="mt-2">
              <RecentItemsSelector
                  v-if="recentAuthors"
                  :list="recentAuthors"
                  @select="setAuthorName"
              />
            </div>
          </div>

        </div>
      </div>

      <div class="mt-10 flex items-center  gap-14">
        <div class="col-span-full">
          <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
          <div class="mt-2 flex items-center gap-x-3">

            <ui-upload-file
                id="1"
                v-model:value="data.image"
            />
          </div>
        </div>
        <div class="col-span-full">
          <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Book</label>
          <div class="mt-2 flex items-center gap-x-3">

            <ui-upload-file
                id="2"
                v-model:value="data.book"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-end gap-x-6">
      <ui-button
          type="submit"
          :loading="loading"
      >
        save
      </ui-button>

    </div>

    <ui-notification
        :status="notificationData.status"
        :message="notificationData.message"
    />

  </form>
</template>
<script setup lang="ts">
import { UiInput } from "@/shared/components/UiInput";
import { UiButton } from "@/shared/components/UiButton";
import { UiUploadFile } from "@/shared/components/UiUploadFile";
import { UiNotification } from "@/shared/components/UiNotification";
import { useBookUpload } from "./BookUpload.composables.ts";
import { RecentItemsSelector } from "@/modules/book/components/RecentItemsSelector";

const { data, loading, onSubmit, notificationData, recentGenres, recentAuthors } = useBookUpload();
const setGenreName = (genreName: string): void => {
  data.genreName = genreName;
};

const setAuthorName = (authorName: string): void => {
  data.authorName = authorName;
};

</script>