<template>
  <div class="books-library w-full py-1 md:w-2/3 lg:w-3/4">
    <div
        v-if="loading"
        class="flex flex-wrap gap-4 justify-center md:justify-start"
    >
      <book-card-skeleton/>
      <book-card-skeleton/>
      <book-card-skeleton/>
    </div>

    <div
        v-else
        class="flex flex-wrap gap-4 justify-center md:justify-start">
      <book-card
          v-for="book in books" :key="book._id"
          :title="book.title"
          :image="book.image"
          :author="book.author"
          :book="book.book"
          :genre="book.genre"
          :_id="book._id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Book } from "@/modules/book/static/types";
import { BookCard } from "@/modules/dashboard/components/BookCard";
import { BookCardSkeleton } from "@/modules/dashboard/components/BookCard/BookCardSkeleton";
import { bookApi } from "@/services/api/controllers/bookApi";

const books = ref<Book[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await bookApi.getUserBooks(); // Попытка загрузить книги
    books.value = response.books;
    loading.value = false;

  } catch (error) {
    console.error("Ошибка при загрузке книг:", error);
    // Обработка ошибок, если что-то пошло не так
  }
});
</script>