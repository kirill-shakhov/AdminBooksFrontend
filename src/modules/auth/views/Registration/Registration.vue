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
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <Logo
          class="mx-auto w-auto"
          style="width: 70px"
          theme="dark"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
      <h3 class="mt-5 text-right text-2sm font-bold  tracking-tight text-gray-400">{{ displayCurrentStep }}</h3>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent='onSubmit'>

        <keep-alive>
          <component :is="currentStepComponent" :formData="data"></component>
        </keep-alive>

        <div v-if="data.currentStep > 1">
          <ui-button
              @click="previousStep"
              block
          >
            previous step
          </ui-button>

        </div>

        <div v-if="data.currentStep < 2">
          <ui-button
              :loading="loading"
              @click="validateFirstStep"
              block
          >
            next step
          </ui-button>

        </div>

        <div v-if="data.currentStep == 2">
          <ui-button
              :loading="loading"
              type="submit"
              block
          >
            register
          </ui-button>

        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        {{ ' ' }}
        <router-link :to="{name: 'login'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Log
          in!
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import RegistrationStepOne from './RegistrationStepOne.vue';
import RegistrationStepTwo from './RegistrationStepTwo.vue';

import { UiButton } from "@/shared/components/UiButton";
import { Logo } from "@/shared/components/Logo";

import { registrationComposables } from "./Registration.composables.ts";

const { data, loading, previousStep, validateFirstStep, displayCurrentStep, onSubmit } = registrationComposables();

let currentStepComponent = computed(() => {
  switch (data.currentStep) {
    case 1:
      return RegistrationStepOne;
    case 2:
      return RegistrationStepTwo;
  }
})


</script>

<style></style>
