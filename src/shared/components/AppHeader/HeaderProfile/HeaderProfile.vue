<template>
  <Popover class="relative">
    <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none">
      <ui-avatar :image="headerProfileData.user.image" aria-hidden="true"/>
    </PopoverButton>

    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">

      <PopoverPanel
          class="absolute right-0 top-full z-10 divide-y divide-gray-100 mt-3 md:w-screen max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
        <div class="px-4 py-3 text-sm text-gray-900">
          <div>{{ headerProfileData.user.fullName }}</div>
          <div class="font-medium truncate">{{ headerProfileData.user.email }}</div>
        </div>

        <ul v-for="item in headerProfileData.pages" :key="item.name"
            class="relative py-2 text-sm text-gray-700 dark:text-gray-200">
          <li class="hover:bg-gray-100 dark:hover:bg-gray-100">
            <router-link :to="item.link"
                         class="block text px-4 py-2-sm font-semibold leading-6 text-gray-900">{{
                item.name
              }}
            </router-link>
          </li>
        </ul>
        <div class="px-4 py-3">
          <button @click="logout" class="block py-2 text-sm font-semibold leading-6 text-gray-900">Sign out</button>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { UiAvatar } from "@/shared/components/UiAvatar";

import { HeaderProfileComposables } from "./HeaderProfile.composables.ts";
import { useAuth } from "../../../composables/useAuth/useAuth.ts";

const { headerProfileData } = HeaderProfileComposables();
const { logout } = useAuth();

</script>
