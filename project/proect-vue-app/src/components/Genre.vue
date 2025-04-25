<script setup lang="ts">
defineProps({
  nameGenre: String,
  imgSrc: String,
  detailGenreId: String,
});
</script>

<template>
  <div class="genre">
    <router-link :to="'genres/' + detailGenreId">
      <img class="genre__img" :src="imgSrc" :alt="nameGenre" />
      <p class="genre__name">{{ nameGenre }}</p>
    </router-link>
  </div>
</template>

<style scoped>
.genre__name {
  margin: 0;
  padding-top: 20px;
  font-weight: 700;
  font-size: 24px;
  line-height: 133%;
  text-align: center;
  color: #fff;
}
</style>