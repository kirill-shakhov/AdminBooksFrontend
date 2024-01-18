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
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
           alt="Your Company"/>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent='onSubmit'>


        <keep-alive>
          <component :is="currentStepComponent" :formData="data" ></component>
        </keep-alive>
        <div v-if="data.currentStep > 1">
          <ui-button
              @click="previousStep"
          >
            предыдущий этап
          </ui-button>

        </div>

        <div v-if="data.currentStep < 2">
          <ui-button
              @click="nextStep"
          >
            следующий этап
          </ui-button>

        </div>

        <div v-if="data.currentStep == 2">
          <ui-button
              type="submit"
          >
            зарегистрироваться
          </ui-button>

        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import RegistrationStepOne from './RegistrationStepOne.vue';
import RegistrationStepTwo from './RegistrationStepTwo.vue';

import UiButton from "../../../../components/UiButton/UiButton.vue";

import { registrationComposables } from "./Registration.composables.ts";

const { data, previousStep, nextStep, onSubmit } = registrationComposables();

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