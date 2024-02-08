<template>
  <div>
    <Header/>
    <div class="mx-auto max-w-7xl flex gap-5 p-6 lg:px-8">

      <nav class="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div class="border-r border-gray-200">
          <h1 class="pl-3 mb-4 text-2xl font-semibold">Settings</h1>

          <ul class="relative py-2 text-sm text-gray-700 dark:text-gray-200">
            <li class="hover:bg-gray-100 dark:hover:bg-gray-100">
              <router-link
                  :to="{ name: 'profile' }"
                  class="block text px-4 py-2-sm font-semibold leading-6 text-gray-900">
                Profile
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <router-view/>
    </div>
    <Footer/>
  </div>
</template>
<script setup lang="ts">
import Header from "../../../../shared/components/Header/Header.vue";
import Footer from "../../../../shared/components/Footer/Footer.vue";
</script>
