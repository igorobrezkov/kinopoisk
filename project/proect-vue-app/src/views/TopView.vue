<script setup lang="ts">
import TopRating from "../components/TopRating.vue";
const films = [
  { img: "/src/assets/images/top1.png", rating: 1, id: 1 },
  { img: "/src/assets/images/top2.png", rating: 2, id: 2 },
  { img: "/src/assets/images/top3.png", rating: 3, id: 3 },
  { img: "/src/assets/images/top4.png", rating: 4, id: 4 },
  { img: "/src/assets/images/top5.png", rating: 5, id: 5 },
  { img: "/src/assets/images/top6.png", rating: 6, id: 6 },
  { img: "/src/assets/images/top7.png", rating: 7, id: 7 },
  { img: "/src/assets/images/top8.png", rating: 8, id: 8 },
  { img: "/src/assets/images/top9.png", rating: 9, id: 9 },
  { img: "/src/assets/images/top10.png", rating: 10, id: 10 },
];
</script>
<template>
  <section class="top-10">
    <div class="container">
      <h2 class="top-10__title">Топ 10 фильмов</h2>
      <ul class="top-10__list">
        <li class="top-10__item" v-for="film in films" :key="film.id">
          <img class="top-10__img" :src="film.img" alt="" />
          <TopRating :rating="film.rating" />
        </li>
      </ul>
    </div>
  </section>
</template>