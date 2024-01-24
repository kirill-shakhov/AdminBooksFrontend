<template>
  <div>
    <Header/>

    Dashboard

  </div>
</template>

<script setup lang="ts">
import Header from "../../../../shared/components/Header/Header.vue";

import { useAuth } from '../../../../shared/composables/useAuth/useAuth.ts'
const { user } = useAuth();

</script>
