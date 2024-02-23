<template>
  <div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="item in list" type="button" @click="selectItem(item)" :key="item.name"
              class="inline-flex  items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 pointer">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  list: Array<any>;
}

defineProps<Props>();

const emit = defineEmits(['select']);

const selectItem = (item: { name: string }) => {
  emit('select', item.name);
};

</script>

