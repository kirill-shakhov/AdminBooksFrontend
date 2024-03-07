<template>
  <div class="flex flex-col min-h-screen">
    <app-header/>
    <main class="flex-grow overflow-hidden">
      <div class="mx-auto max-w-7xl  gap-5 p-6 lg:px-8">
        <user-books-showcase/>
      </div>
    </main>
    <app-footer/>
  </div>
</template>

<script setup lang="ts">
import { AppHeader } from "@/shared/components/AppHeader";
import { AppFooter } from "@/shared/components/AppFooter";
import { UserBooksShowcase } from "@/modules/dashboard/components/UserBooksShowcase";
</script>
