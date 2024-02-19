<template>
  <div
      class="relative flex w-full max-w-[18rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg animate-pulse">
    <div
        class="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
      <div class="w-full h-72 bg-gray-300"></div>
      <div
          class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
      </div>
      <button
          class="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase  transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
        <!--        text-red-500-->
        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path
              d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z">
          </path>
        </svg>
      </span>
      </button>
    </div>
    <div class="p-6">
      <div class="flex-1 space-y-6 py-1">
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-3 bg-gray-300 rounded col-span-2"></div>
            <div class="h-3 bg-gray-300 rounded col-span-1"></div>
          </div>
          <div class="h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    <div class="p-6 pt-3 mt-auto">
      <div class="text-sm shadow-sm rounded-md w-full h-8 bg-gray-300"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>