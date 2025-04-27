<script setup lang="ts">
import TopRating from "../components/TopRating.vue";
import { usePromise } from 'vue-promised';
import { getTop10 } from "../api/top10";
import { ref } from 'vue'
const arrFilms = ref();
const setArrFilms = (val: any) => {
  arrFilms.value = val;
}

const top10 = getTop10();
const promised = usePromise(top10);

</script>
<template>
  <section class="top-10">
    {{ setArrFilms(promised.data.value) }}
    <div class="container">
      <h2 class="top-10__title">Топ 10 фильмов</h2>
      <ul class="top-10__list">
        <li class="top-10__item" :class="{'top-10__item--no-image': !film.backdropUrl && !film.posterUrl}" v-if="promised.data.value" v-for="(film, index) in arrFilms.data" :key="film?.id">
          <router-link :to="{ name: 'film', params: { id: film.id }}" class="top-10__link">
            <img class="top-10__img" v-if="film.posterUrl" :src="film.posterUrl" alt="" />
            <img class="top-10__img" v-else-if="film.backdropUrl" :src="film.backdropUrl" alt="" />
            <span v-else class="top10-desc"> {{ film.title }}</span>
            <TopRating :rating="index + 1" />
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
 .top-10__link {
  display: flex;
 }
</style>