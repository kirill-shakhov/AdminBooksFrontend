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
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent='onSubmit'>


        <UiInput
            v-model:value="data.username"
            label="Username"
            name="username"
            type="text"
        />

        <UiInput
            v-model:value="data.password"
            label="password"
            name="password"
            type="text"
        />

        <div>
          <ui-button
              type="submit"
              block
              :loading="loading"
          >
            login
          </ui-button>

        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an account?
        {{ ' ' }}
        <router-link :to="{name: 'register'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign
          up!
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UiInput from "../../../../shared/components/UiInput/UiInput.vue";
import UiButton from "../../../../shared/components/UiButton/UiButton.vue";

import { loginComposables } from "./Login.composables.ts";
import Logo from "../../../../shared/components/Logo/Logo.vue";

const { data, loading, onSubmit } = loginComposables()

</script>

<style></style>