<template>
<div>
  <router-link :to="{ name: 'register' }">Регистрация</router-link>
</div>
  <router-view/>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<style scoped>
</style>
