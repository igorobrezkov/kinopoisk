<script setup lang="ts">
import Favorite from "../assets/images/svg-sprite/favorite.svg";
import FavoriteAdd from "../assets/images/svg-sprite/favorite_add.svg";
import CinemaGuide from "../assets/images/svg-sprite/cinema_guide.svg";
defineProps({
  componentName: String,
});
</script>

<template>
  <button class="btn__circle" v-if="componentName == 'favorite'" type="button">
    <Favorite />
  </button>
  <button
    class="btn__circle"
    v-else-if="componentName == 'favorite-add'"
    type="button"
  >
    <FavoriteAdd />
  </button>
  <button
    class="btn__circle"
    v-else-if="componentName == 'cinema-guide'"
    type="button"
  >
    <CinemaGuide />
  </button>
</template>

<style scoped>
</style>