<template>
  <form class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what
          you share.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
            <div class="mt-2 flex items-center gap-x-3">
              <!--              <UserCircleIcon class="h-12 w-12 text-gray-300" aria-hidden="true"/>-->
              <ui-upload-file  />
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <UiInput

                v-model:value="data.firstname"
                label="Firstname"
                name="firstname"
                :placeholder="data.firstname"
                type="text"/>
          </div>

          <div class="sm:col-span-3">
            <UiInput
                v-model:value="data.lastname"
                label="Lastname"
                name="lastname"
                :placeholder="data.lastname"
                type="text"
            />
          </div>

          <div class="sm:col-span-4">
            <UiInput
                v-model:value="data.email"
                label="Email"
                name="email"
                :placeholder="data.email"
                type="email"/>
          </div>

        </div>
      </div>

    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import UiInput from '../../../../shared/components/UiInput/UiInput.vue';

import { profileSettingsComposables } from './ProfileSettings.composables.ts';
import UiUploadFile from '../../../../shared/components/UiUploadFile/UiUploadFile.vue';

const { data } = profileSettingsComposables();
</script>
