<template>
  <div class="flex flex-col min-h-screen">
    <app-header/>

    <main class="flex-grow">
      <div class="mx-auto max-w-7xl flex gap-5 p-6 lg:px-8">

        <nav class="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div class="border-r border-gray-200">
            <h1 class="pl-3 mb-4 text-2xl font-semibold">Book</h1>

            <ul class="relative py-2 text-sm text-gray-700 dark:text-gray-200">
              <li
                  class="py-2"
                  :class="{ 'bg-gray-100': isActiveRoute('library') }"
              >
                <router-link
                    :to="{ name: 'library' }"
                    class="block text px-4 py-2-sm font-semibold leading-6 text-gray-900">
                  Library
                </router-link>
              </li>

              <li
                  class="py-2"
                  :class="{ 'bg-gray-100': isActiveRoute('uploadBook') }"
              >
                <router-link
                    :to="{ name: 'uploadBook' }"
                    class="block text px-4 py-2-sm font-semibold leading-6 text-gray-900">
                  Upload
                </router-link>
              </li>
            </ul>
          </div>
        </nav>

        <router-view/>
      </div>
    </main>
    <app-footer/>
  </div>
</template>
<script setup lang="ts">
import { AppHeader } from "@/shared/components/AppHeader/index.ts";
import { AppFooter } from "@/shared/components/AppFooter";
import { useRoute } from "vue-router";

const route = useRoute();

const isActiveRoute = (routeName: string) => {
  return route.name === routeName;
};


</script>
