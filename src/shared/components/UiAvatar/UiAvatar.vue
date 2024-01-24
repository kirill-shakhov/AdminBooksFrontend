<template>
  <div>
    <img class="w-10 h-10 rounded-full object-cover" :src="image" alt="avatar">
  </div>
</template>

<script setup lang="ts">
interface UiAvatarProps {
  image: string | null;
}

// сделать prop size

const props = withDefaults(defineProps<UiAvatarProps>(), {
  image: ''
})
</script>