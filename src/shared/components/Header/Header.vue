<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
        </button>
      </div>

      <div class="flex lg:flex-1">

        <router-link :to="{ name: 'dashboard' }" class="-m-1.5 p-1.5 hidden lg:block">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
        </router-link>

        <header-profile class="lg:hidden"/>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">

        <router-link :to="{ name: 'dashboard' }" class="text-sm font-semibold leading-6 text-gray-900">Dashboard
        </router-link>
        <router-link :to="{ name: 'library' }" class="text-sm font-semibold leading-6 text-gray-900">My books
        </router-link>

      </PopoverGroup>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <header-profile/>
      </div>

    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" @click="" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10"/>
      <DialogPanel
          class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>

            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
          </a>

          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>

            <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">

              <router-link
                  :to="{ name: 'dashboard' }"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Dashboard
              </router-link>

              <router-link
                  :to="{ name: 'profile' }"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Profile
              </router-link>

              <router-link
                  :to="{ name: 'library' }"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                My books
              </router-link>

            </div>

            <div class="py-3">
              <button @click="logout"
                      class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                Sign out
              </button>
            </div>

          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderProfile from "./HeaderProfile/HeaderProfile.vue";
import { useAuth } from "../../composables/useAuth/useAuth.ts";

import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)


const { logout } = useAuth();

</script>
