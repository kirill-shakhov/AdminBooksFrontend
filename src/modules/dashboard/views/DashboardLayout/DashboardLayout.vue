<template>
  <div class="flex flex-col min-h-screen">
    <Header/>
    <main class="flex-grow overflow-hidden">
      <div class="mx-auto max-w-7xl  gap-5 p-6 lg:px-8">
        <user-books-showcase/>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "../../../../shared/components/Header/Header.vue";
import Footer from "../../../../shared/components/Footer/Footer.vue";
import UserBooksShowcase from "../../components/UserBooksShowcase/UserBooksShowcase.vue";
</script>
