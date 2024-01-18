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

  <UiInput
      v-model:value="props.formData.username"
      label="Username"
      name="username"
      type="text"
  />

  <UiInput
      v-model:value="props.formData.password"
      autocomplete
      label="Password"
      name="password"
      type="password"
  />

  <UiInput
      v-model:value="props.formData.firstName"
      label="First Name"
      name="firstName"
      type="text"
  />

  <UiInput
      v-model:value="props.formData.lastName"
      label="Last Name"
      name="lastName"
      type="text"
  />

  <UiInput
      v-model:value="props.formData.email"
      label="Email"
      name="email"
      type="text"
  />


</template>

<script lang="ts" setup>
import UiInput from "../../../../components/UiInput/UiInput.vue";

interface FormData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

const props = defineProps<{
  formData: FormData;
}>();

</script>

<style></style>