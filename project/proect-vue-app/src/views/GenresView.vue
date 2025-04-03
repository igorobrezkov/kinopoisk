<script setup lang="ts">
import Genre from "../components/Genre.vue";
const genres = [
  { img: "/src/assets/images/genre1.png", name: "Драма", id: 1 },
  { img: "/src/assets/images/genre2.png", name: "Комедия", id: 2 },
  { img: "/src/assets/images/genre3.png", name: "Детектив", id: 3 },
  { img: "/src/assets/images/genre4.png", name: "Семейное", id: 4 },
  { img: "/src/assets/images/genre5.png", name: "Историческое", id: 5 },
  { img: "/src/assets/images/genre6.png", name: "Триллер", id: 6 },
  { img: "/src/assets/images/genre7.png", name: "Фантастика", id: 7 },
  { img: "/src/assets/images/genre8.png", name: "Приключения", id: 8 },
];
</script>


<template>
  <section class="genres">
    <div class="container">
      <h1 class="genres__title">Жанры фильмов</h1>
      <ul class="genres__list">
        <li class="genres__item" v-for="genre in genres" :key="genre.id">
          <Genre
            :nameGenre="genre.name"
            :imgSrc="genre.img"
            :detailGenreId="genre.id"
          />
        </li>
      </ul>
    </div>
  </section>
</template>