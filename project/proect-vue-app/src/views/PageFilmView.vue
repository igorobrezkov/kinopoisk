<script setup lang='ts'>
import PageFilm from "../components/PageFilm.vue";
import FilmDescription from "../components/FilmDescription.vue";
</script>

<template>
  <section class="film-detail">
    <div class="container">
      <PageFilm :showBtn="false" />
      <FilmDescription />
    </div>
  </section>
</template>
