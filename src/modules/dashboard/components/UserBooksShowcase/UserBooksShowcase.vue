<template>
  <div>

    <div v-if="loading" class="flex flex-wrap gap-4 justify-center md:justify-start">
      <book-card-skeleton/>
    </div>

    <swiper
        v-else
        :freeMode="true"
        :modules="[FreeMode, Autoplay]"
        :autoplay="{
            delay: 15000,
            disableOnInteraction: false,
           }"
        class="userBooksShowcase"

        :breakpoints="{
          320: {
            slidesPerView: 1,
          },

          576: {
            slidesPerView: 2
          },

          991: {
            slidesPerView: 3
          },
        }"
    >
      <swiper-slide
          v-for="book in books"
          :key="book._id"
          style="height: auto"
      >
        <book-card
            :title="book.title"
            :image="book.image"
            :author="book.author"
            :book="book.book"
            :genre="book.genre"
            :_id="book._id"
            class="h-full"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import { onMounted, ref } from "vue";
import BookCard from "../BookCard/BookCard.vue";
import BookCardSkeleton from "../BookCard/BookCardSkeleton/BookCardSkeleton.vue";
import { bookApi } from "@/services/api/controllers/bookApi";
import { Book } from "@/modules/book/static/types";


const books = ref<Book[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await bookApi.getUserBooks(); // Попытка загрузить книги
    books.value = response.books;
    loading.value = false;

  } catch (error) {
    console.error("Ошибка при загрузке книг:", error);
  }
});

</script>

<style lang="scss">
.userBooksShowcase {
  overflow: visible;
}
</style>