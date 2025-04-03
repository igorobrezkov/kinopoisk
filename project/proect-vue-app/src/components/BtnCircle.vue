<script setup lang="ts">
import Favorite from "../assets/images/svg-sprite/favorite.svg";
import CinemaGuide from "../assets/images/svg-sprite/cinema_guide.svg";
defineProps({
  componentName: String,
});
</script>


<template>
  <span class="btn__circle" v-if="componentName == 'favorite'" type="button"
    ><Favorite
  /></span>
  <span
    class="btn__circle"
    v-else-if="componentName == 'cinema-guide'"
    type="button"
    ><CinemaGuide
  /></span>
</template>

<style scoped>
.btn__circle {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 28px;
  width: 68px;
  height: 56px;
  display: inline-block;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn__circle > svg {
  width: 24px;
  height: 24px;
}
</style>