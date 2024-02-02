<template>
  <form class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4" action="#" @submit.prevent='onSubmit'>
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
              <ui-upload-file v-model:value="data.image"/>
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

                v-model:value="data.firstName"
                label="Firstname"
                name="firstName"
                :placeholder="data.firstName"
                type="text"/>
          </div>

          <div class="sm:col-span-3">
            <UiInput
                v-model:value="data.lastName"
                label="Lastname"
                name="lastName"
                :placeholder="data.lastName"
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

    <div class="mt-6 flex justify-end gap-x-6">
      <ui-button
          type="submit"
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
import UiInput from '../../../../shared/components/UiInput/UiInput.vue';

import { useProfileSettings } from './ProfileSettings.composables.ts';
import UiUploadFile from '../../../../shared/components/UiUploadFile/UiUploadFile.vue';
import UiNotification from "../../../../shared/components/UiNotification/UiNotification.vue";
import UiButton from "../../../../shared/components/UiButton/UiButton.vue";

const { data, onSubmit, notificationData } = useProfileSettings();
</script>
