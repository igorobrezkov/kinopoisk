<script setup lang="ts">

import { useRouter } from "vue-router";
const props = defineProps({
  text: String,
  filmId: Number,
});

const router = useRouter();
const routeToPush = () => {
  router.push("film/" + props.filmId);
};
</script>


<template>
  <span class="btn__default" type="button" @click="routeToPush">
    {{ text }}</span
  >
</template>

<style scoped>
.btn__default {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 28px;
  padding: 16px 48px;
  background: #393b3c;
  font-weight: 700;
  font-size: 18px;
  line-height: 133%;
  color: #fff;
}
.btn__default:hover {
  cursor: pointer;
}
</style>