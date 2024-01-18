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
  <div>Загрузить изображение</div>
</template>

<script lang="ts" setup>
import UiInput from "../../../../components/UiInput/UiInput.vue";
import { registrationComposables } from "./Registration.composables.ts";

const { data } = registrationComposables();

</script>

<style></style>